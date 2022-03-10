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
let UserA,UserB,UserC;

UserB = {
    id:2,
    status:1,
    gender:'W',
    place:'Tokyo',
    profile:{
        name:'ビッパーねえ',
        level:40,
        age:'15',
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

UserC = {
    id:3,
    status:1,
    gender:'W',
    place:'Tokyo',
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


UserA = {
    id:1,
    status:1,
    gender:'M',
    place:'Tokyo',
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

UserB.matchList[0].match=UserA
UserC.matchList[0].match=UserA
export default UserA;
