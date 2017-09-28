<?php

namespace App\Http\Controllers\Vue;

use App\Models\User;
use App\Shanti\Billing\Billing;
use App\Models\DonationLevel;
use function bcrypt;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mailchimp;
use Mailchimp_List_AlreadySubscribed;
use function response;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $donationId = request('donation_id');
        $level = DonationLevel::findOrFail($donationId);

        $billing = new Billing();

        $customer = $billing->createCustomer('Description', request('stripe_token'));
        $response = $billing->subscribe($customer, $donationId);

        if (is_string($response)) {
            return response()->json(['success' => false, 'message' => $response]);
        }

        $user = User::where('email', request('email'))->first();

        if (empty($user)) {
            $user = User::create([
               'first_name' => request('first_name'),
               'last_name' => request('first_name'),
               'email' => request('email'),
               'phone_number' => request('phone_number'),
               'password' => bcrypt(request('password')),
               'address' => request('address'),
               'city' => request('city'),
               'state' => request('state'),
               'zip_code' => request('zip_code'),
            ]);
        }

        $user->donations()->create([
            'donation_level_id' => $level->id,
            'amount' => $level->amount,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        if (!empty(request('newsletter'))) {
            $this->mailchimp();
        }

        return response()->json(['success' => true, 'message' => 'Thank you for your donation. You are now subscribed to the ' . $level->donation_level . ' plan.']);
    }

    private function mailchimp() {
        try {
            $mailchimp = new Mailchimp(getenv('MAILCHIMP_API_KEY'));
            $mailchimp->lists->subscribe(getenv('MAILCHIMP_LIST_ID'), ['email' => request('email')], null, 'html');
            return response()->json(['success' => true, 'message' => 'You have been subscribed to our email list.']);
        } catch (Mailchimp_List_AlreadySubscribed $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}