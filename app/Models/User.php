<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function staff() {
        return $this->hasOne(Staff::class);
    }

    public function rsvps() {
        return $this->hasMany(Rsvp::class, 'user_id', 'id');
    }

    public function donations() {
        return $this->hasMany(Donation::class);
    }
}
