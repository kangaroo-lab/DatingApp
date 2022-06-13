import React,{ useState,useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import
  Animated,
{
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import firebase from 'firebase';

export default function GroupMatch(props){
    const {key,address} = props.route.params
    const [count,setCount] = useState(0);
    const [value,setValue] = useState();
    const [type,setType] = useState();
    const [totalSearch,setTotalSearch] = useState(0);
    const [search,setSearch] = useState(false)

    //マッチに必要なデータの下準備
    useEffect(()=>{
        let unsubscribe=searchCounter();
        return unsubscribe;
    },[])

    //db内のWS比率を割り出して、WかSかを判断
    function searchCounter(){
        getAppManager()
            .onSnapshot(async(snapShot)=>{
                let x = 0;
                await Promise.all(snapShot.docs.map(async(doc)=>{
                    if(doc.data().search){
                    x+=1
                    };
                }))
                .then(async()=>{
                    await setTotalSearch(x);
                    whichSorW();
                })
            });
    }

    function whichSorW(){
        if(totalSearch%2==0){
            setSearch(true);
            getDataForMatch()
        }
    }

    //マッチのアンカーになる価値観と性別比を獲得
    function getDataForMatch(){
        getAppManager().doc(key)
            .get()
            .then((val)=>{
                const data = val.data();
                setValue(data.value);
                let gender = {
                    men:0,
                    women:0
                }
                data.members.forEach((elem)=>{
                    if(elem.gender=='男'){
                        gender.men+=1
                    }else{
                        gender.women+=1
                    }
                })
                setType(gender)
            })
            .catch((e)=>console.log(e))
    }

    function getAppManager(){
        const db = firebase.firestore();
        const ref = db.collection(`AppManager/Group/${address}`)
        return ref
    }

    //appmanagerでvalueが近いグループをソートする
    //appmanagerで男女人数比が1:1にできるようなグループにフィルターをかける
    //online状態のグループにマッチさせる

    function controlMatch(){
        if(search){
            getTargets()
        }else{
            wait()
        }
    }

    function getTargets(){
        const equal = [...Array(20)].map(()=>0);
        const high = [...Array(20)].map(()=>0);
        const low = [...Array(20)].map(()=>0);
        const about = [...Array(20)].map(()=>0);
        let i,j = 0
        let k = 19
        getAppManager()
            .orderBy('value','asc')
            .onSnapshot((snapshot)=>{
                snapshot.forEach((doc)=>{
                    function getGender(data){
                        const result = {
                            men:0,
                            women:0
                        };
                        data.forEach((elem)=>{
                            if(elem.gender=='男'){
                                result.men+=1
                            }else{
                                result.women+=1
                            }
                        })
                        return result
                    };
                    const data = doc.data();
                    const partner = {
                        keyId:doc.id,
                        id:data.id,
                        value:data.value,
                    }
                    if(data.wait){
                        const arr  = getGender(data.member)
                        partner.gender = arr
                        switch(true){
                            case data.value > value :
                                high[k] = partner;
                                k-=1;
                                break;
                            case data.value < value :
                                low[i] = partner;
                                i+=1;
                                break;
                            case data.value == value :
                                equal[j] = partner;
                                j+=1;
                                break;
                            default :
                                console.log('ぐへへ')
                        }
                    }
                });
                for(let i=0;i<20;i++){
                    if(high[0]==0){
                      high.shift();
                    }
                };
                let x=0;
                let y=0;
                for(let i=0;i<20;i++){
                    if(i%2==0){
                        about[i]=high[x];
                        x+=1;
                    }else{
                        about[i]=low[y];
                        y+=1;
                    };
                };
                let partnerData = filter(equal);
                if(partnerData!=null){
                    alert('THEREISMATCH!')
                }else{
                    alert('NOMATCHHERE')
                }
            });
    }

    function filter(arr){
        for(let i=0;i<arr.length;i++){
            let men = type.men;
            let women = type.women;
            if(arr[i]==0||!arr[i]){
                continue;
            }
            let totalMen = men+arr[i].gender.men;
            let totalWomen = women+arr[i].gender.women
            if(totalMen==totalWomen){
                return arr[i]
            }else if(totalMen-totalWomen==1||totalWomen-totalMen==1){
                return arr[i]
            }
        };
        return null
    };


    //マッチするまでアニメーションを保つ再帰的な関数
    function wait(){

    }

    async function searching(flag){
        if(flag){
            setCount(1);
            await controlMatch()
            ring.value=withRepeat(
                withTiming(1,{
                    duration: 3000
                }),
                -1,
                false
            );
        }else{
            ring.value=0
        }
    }

    const ring = useSharedValue(0);
    const animeStyle = useAnimatedStyle(()=>{
        return {
            opacity:0.8-ring.value,
            transform:[{
                scale: interpolate(ring.value,[0,1],[0,4]),
            },]
        };
    });

    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>{
                    if(count==0){
                        searching(true)
                    }else{
                        searching(false)
                        setCount(0)
                    }
                }}
            >
                <View style={styles.circle}>
                    <Animated.View style={[animeStyle,styles.circle]}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    circle:{
        borderWidth:5,
        width:179,
        height:179,
        borderRadius:500,
        alignSelf:'center'
    }
})
