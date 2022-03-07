import React from 'react';

import MessageHistory from './MessageHistory';
import OfficialMessageHistory from './OfficialMessageHistory';
/*
Userのデータ
    Profile
        hobbies <- hobbyから選択したものを記載
        values <- valuesから選択したものを記載
    matchList
        matchした相手のデータ
        紐付いたtalkroom
        levelはoff or pre
*/

const UserA = {
    id:1,
    status:1,
    gender:'M',
    profile:{
        name:'けん',
        level:80,
        age:'23',
        photo:require('../IMG_6689.jpg'),
        brief:'こんちゃ！',
        hobbies:'',
        valuse:'',
    },
    matchList:[
        {
            level:'official',
            match:UserB,
            talk:OfficialMessageHistory,
        },
        {
            level:'pre',
            match:UserC,
            talk:MessageHistory,
        }
    ]
}

const UserB = {
    id:2,
    status:1,
    gender:'W',
    profile:{
        name:'ビッパーねぇ',
        level:40,
        birthDay:'',
        photo:require('../89702809_p0_square1200.jpg'),
        brief:'ビッパで何が悪い！',
        hobbies:'',
        valuse:'',
    },
    matchList:[
        {
            level:'official',
            match:UserA,
            talk:OfficialMessageHistory,
        },
    ]
}

const UserC = {
    id:3,
    status:1,
    gender:'W',
    profile:{
        name:'あねご',
        level:90,
        birthDay:'',
        photo:require('../78411982_480x556.jpg'),
        brief:'あたいがあねごだよ！！',
        hobbies:'',
        valuse:'',
    },
    matchList:[
        {
            level:'pre',
            match:UserA,
            talk:MessageHistory,
        },
    ]
}

export default UserA;
