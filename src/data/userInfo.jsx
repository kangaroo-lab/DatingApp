// profileの基本情報

const UserInfo = {
    info:[
    {
        id:0,
        title:'ニックネーム'
    },
    {
        id:1,
        title:'年齢',
        list:[
            18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,'50以上'
        ]
    },
    {
        id:2,
        title:'血液型',
        list:[
            'A','B','C','O','AB','それ以外'
        ]
    },
    {
        id:3,
        title:'移住地',
        list:[
            " 北海道 " ,
            " 青森県 " ,
            " 岩手県 " ,
            " 宮城県 " ,
            " 秋田県 " ,
            " 山形県 " ,
            " 福島県 " ,
            " 茨城県 " ,
            " 栃木県 " ,
            " 群馬県 " ,
            " 埼玉県 " ,
            " 千葉県 " ,
            " 東京都 " ,
            " 神奈川県 " ,
            " 新潟県 " ,
            " 富山県 " ,
            " 石川県 " ,
            " 福井県 " ,
            " 山梨県 " ,
            " 長野県 " ,
            " 岐阜県 " ,
            " 静岡県 " ,
            " 愛知県 " ,
            " 三重県 " ,
            " 滋賀県 " ,
            " 京都府 " ,
            " 大阪府 " ,
            " 兵庫県 " ,
            " 奈良県 " ,
            " 和歌山県 " ,
            " 鳥取県 " ,
            " 島根県 " ,
            " 岡山県 " ,
            " 広島県 " ,
            " 山口県 " ,
            " 徳島県 " ,
            " 香川県 " ,
            " 愛媛県 " ,
            " 高知県 " ,
            " 福岡県 " ,
            " 佐賀県 " ,
            " 長崎県 " ,
            " 熊本県 " ,
            " 大分県 " ,
            " 宮崎県 " ,
            " 鹿児島県 " ,
            " 沖縄県 "
        ]
    },
    {
        id:4,
        title:'勤務地',
        list:[
            " 北海道 " ,
            " 青森県 " ,
            " 岩手県 " ,
            " 宮城県 " ,
            " 秋田県 " ,
            " 山形県 " ,
            " 福島県 " ,
            " 茨城県 " ,
            " 栃木県 " ,
            " 群馬県 " ,
            " 埼玉県 " ,
            " 千葉県 " ,
            " 東京都 " ,
            " 神奈川県 " ,
            " 新潟県 " ,
            " 富山県 " ,
            " 石川県 " ,
            " 福井県 " ,
            " 山梨県 " ,
            " 長野県 " ,
            " 岐阜県 " ,
            " 静岡県 " ,
            " 愛知県 " ,
            " 三重県 " ,
            " 滋賀県 " ,
            " 京都府 " ,
            " 大阪府 " ,
            " 兵庫県 " ,
            " 奈良県 " ,
            " 和歌山県 " ,
            " 鳥取県 " ,
            " 島根県 " ,
            " 岡山県 " ,
            " 広島県 " ,
            " 山口県 " ,
            " 徳島県 " ,
            " 香川県 " ,
            " 愛媛県 " ,
            " 高知県 " ,
            " 福岡県 " ,
            " 佐賀県 " ,
            " 長崎県 " ,
            " 熊本県 " ,
            " 大分県 " ,
            " 宮崎県 " ,
            " 鹿児島県 " ,
            " 沖縄県 "
        ]
    },
    {
        id:5,
        title:'出身地',
        list:[
            " 北海道 " ,
            " 青森県 " ,
            " 岩手県 " ,
            " 宮城県 " ,
            " 秋田県 " ,
            " 山形県 " ,
            " 福島県 " ,
            " 茨城県 " ,
            " 栃木県 " ,
            " 群馬県 " ,
            " 埼玉県 " ,
            " 千葉県 " ,
            " 東京都 " ,
            " 神奈川県 " ,
            " 新潟県 " ,
            " 富山県 " ,
            " 石川県 " ,
            " 福井県 " ,
            " 山梨県 " ,
            " 長野県 " ,
            " 岐阜県 " ,
            " 静岡県 " ,
            " 愛知県 " ,
            " 三重県 " ,
            " 滋賀県 " ,
            " 京都府 " ,
            " 大阪府 " ,
            " 兵庫県 " ,
            " 奈良県 " ,
            " 和歌山県 " ,
            " 鳥取県 " ,
            " 島根県 " ,
            " 岡山県 " ,
            " 広島県 " ,
            " 山口県 " ,
            " 徳島県 " ,
            " 香川県 " ,
            " 愛媛県 " ,
            " 高知県 " ,
            " 福岡県 " ,
            " 佐賀県 " ,
            " 長崎県 " ,
            " 熊本県 " ,
            " 大分県 " ,
            " 宮崎県 " ,
            " 鹿児島県 " ,
            " 沖縄県 "
        ]
    },
    {
        id:6,
        title:'兄弟姉妹',
        list:[
            '未設定','長男/長女','次男/次女','三男/三女','一人っ子','その他'
        ]
    },
    {
        id:7,
        title:'話せる言語',
    },
    {
        id:8,
        title:'身長',
        list:[
            "140以下",
            141 ,
            142 ,
            143 ,
            144 ,
            145 ,
            146 ,
            147 ,
            148 ,
            149 ,
            150 ,
            151 ,
            152 ,
            153 ,
            154 ,
            155 ,
            156 ,
            157 ,
            158 ,
            159 ,
            160 ,
            161 ,
            162 ,
            163 ,
            164 ,
            165 ,
            166 ,
            167 ,
            168 ,
            169 ,
            170 ,
            171 ,
            172 ,
            173 ,
            174 ,
            175 ,
            176 ,
            177 ,
            178 ,
            179 ,
            180 ,
            181 ,
            182 ,
            183 ,
            184 ,
            185 ,
            186 ,
            187 ,
            188 ,
            189 ,
            190 ,
            "190以上"
        ]
    },
    {
        id:9,
        title:'体型',
        list:[
            'スリム','やや細め','普通','グラマー','筋肉質','ややぽっちゃり','太め'
        ]
    },
    {
        id:10,
        title:'学歴',
        list:[
            '未設定','高校卒','大学卒','短大/専門卒','大学院卒','その他'
        ]
    },
    {
        id:11,
        title:'職種',
        list:[

        ]
    },
    {
        id:12,
        title:'職業名'
    },
    {
        id:13,
        title:'年収',
        list:[
            '未設定','200万未満','200~400万円','400~600万円','600-800万円','800~1000万円','1000万~1500万円','1500~2000万円','2000~3000万円','3000万円以上'
        ]
    },
    {
        id:14,
        title:'休日',
        list:[
            '未設定','土日','平日','不定期','その他'
        ]
    },
    {
        id:15,
        title:'お酒',
        list:[
            '未設定','飲まない','飲む','ときどき飲む'
        ]
    },
    {
        id:16,
        title:'タバコ',
        list:[
            '未設定','吸わない','相手が嫌ならやめる','非喫煙者の前では吸わない','吸う','吸う(電子タバコ)'
        ]
    },
    {
        id:17,
        title:'同居人',
        list:[
            '未設定','一人暮らし','ルームシェア','ペットがいます','実家暮らし','その他'
        ]
    },
    {
        id:18,
        title:'結婚歴',
        list:[
            '未設定','未婚','離婚','死別'
        ]
    },
    {
        id:19,
        title:'子供の有無',
        list:[
            '未設定','なし','同居中','別居中'
        ]
    },
    {
        id:20,
        title:'子供が欲しいか',
        list:[
            '未設定','はい','いいえ','わからない'
        ]
    },
    {
        id:21,
        title:'家事・育児',
        list:[
            '未設定','積極的に参加したい','できれば参加したい','できれば相手に任せたい','相手に任せたい'
        ]
    },
    {
        id:22,
        title:'出会うまでの希望',
        list:[
            '未設定','できればすぐに会いたい','気が合えば会いたい','会う前に通話したい','メッセージで交流を深めてから'
        ]
    },
    {
        id:23,
        title:'初回デート費用',
        list:[
            '未設定','男性が全て払う','男性が多めに払う','割り勘','持っている方が払う','相手と相談して決める'
        ]
    }
]}

export default UserInfo;
