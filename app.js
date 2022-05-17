//一定時間毎に閾値を超えた数を記録
var overTreshhold = new Array(2);
overTreshhold.fill(0);
//運動強度を記録
var motion = new Array(2);
motion.fill(0);
//セクションごとの音楽名を記録
var MusicData = new Array(2);
MusicData.fill(0);

//閾値
const treshhold =1.06;


//ファイル読み込み時に実行
document.getElementById('file').onchange = function(){
  var musicselect;
  //読み込むファイル
  var file = this.files[0]; //1つ目のファイル
  //FileReaderのオブジェクトを作成
  var reader = new FileReader();
  //file読み込み完了時のイベント
  reader.onload = function(){    
    //読み込んだ文字列データをjsonとして扱い、オブジェクトへ変換
    const obj = JSON.parse(this.result);
    //プロパティ毎に計算
    for(var data in obj){
      var Data = obj[data];
      //オブジェクトの中で時間がn秒~n+?秒の時、閾値以上の値がいくつかを計算
      if(Data["Time"] <= 2){     //2秒以下
        if(Data["Accel"] >= treshhold){   //計測データが1以上のとき（閾値が1）
          overTreshhold[0] = overTreshhold[0] + 1; //閾値以上のデータ数をセクション1に代入
        }
      }else if(Data["Time"] > 2 && Data["Time"] <= 4){   //2秒より上、4秒以下
        if(Data["Accel"] >= treshhold){    //計測データが1以上のとき（閾値が1）
          overTreshhold[1] = overTreshhold[1] + 1; //閾値以上のデータ数をセクション2に代入
        }
      }
    }
    console.log("閾値" + treshhold +"以上：" + overTreshhold[0] + "回");
    console.log("閾値" + treshhold +"以上：" + overTreshhold[1] + "回");

    //一定時間毎の運動強度を計算
    for(var i=0; i<2; i++){
      motion[i] = calc_Exercise(overTreshhold[i]);
    }

    //音楽選択関数へ
    musicselect = Math.floor(Math.random() * 3);
    if(musicselect == 0){
      Selection1();
    }else if(musicselect == 1){
      Selection2();
    }else if(musicselect == 2){
      Selection3();
    }else{
      Selection4();
    }

    console.log(MusicData);
    console.log("musicselect:"+musicselect);
    musicselect=4;
    //音楽再生関数へ
    switch (musicselect){
      case 0:
        PlayMusic1();
      case 1:
        PlayMusic2();
        console.log("再生1");
        break;
      case 2:
        PlayMusic3();
      case 3:
        PlayMusic4();
      case 4:
        PlayMusic5();
    }

  };
  //読み込みを実行
  reader.readAsText(file);
}

//一定時間毎の運動強度を計算
function calc_Exercise(overTreshhold){
  var section = 0;
  if(overTreshhold <= 2){
    section=0;
  }else if(overTreshhold >2 && overTreshhold <=4){
    section=1;
  }else if(overTreshhold >4 && overTreshhold <=8){
    section=2;
  }else{
    section=3;
  }
  console.log("運動強度：" + (section+1));
  return(section);
}

//セクションごとの音楽選択関数（music1）
function Selection1(){
  const music = [
    ["sample1_1_1","sample1_2_1","sample1_3_1","sample1_4_1","sample1_5_1"],
    ["sample1_1_2","sample1_2_2","sample1_3_2","sample1_4_2","sample1_5_2"],
    ["sample1_1_3","sample1_2_3","sample1_3_3","sample1_4_3","sample1_5_3"],
    ["sample1_1_4","sample1_2_4","sample1_3_4","sample1_4_4","sample1_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}
//セクションごとの音楽選択関数（music2）
function Selection2(){
  const music = [
    ["sample2_1_1","sample2_2_1","sample2_3_1","sample2_4_1","sample2_5_1"],
    ["sample2_1_2","sample2_2_2","sample2_3_2","sample2_4_2","sample2_5_2"],
    ["sample2_1_3","sample2_2_3","sample2_3_3","sample2_4_3","sample2_5_3"],
    ["sample2_1_4","sample2_2_4","sample2_3_4","sample2_4_4","sample2_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}
//セクションごとの音楽選択関数（music3）
function Selection3(){
  const music = [
    ["sample3_1_1","sample3_2_1","sample3_3_1","sample3_4_1","sample3_5_1"],
    ["sample3_1_2","sample3_2_2","sample3_3_2","sample3_4_2","sample3_5_2"],
    ["sample3_1_3","sample3_2_3","sample3_3_3","sample3_4_3","sample3_5_3"],
    ["sample3_1_4","sample3_2_4","sample3_3_4","sample3_4_4","sample3_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}
//セクションごとの音楽選択関数（music4）
function Selection4(){
  const music = [
    ["sample4_1_1","sample4_2_1","sample4_3_1","sample4_4_1","sample4_5_1"],
    ["sample4_1_2","sample4_2_2","sample4_3_2","sample4_4_2","sample4_5_2"],
    ["sample4_1_3","sample4_2_3","sample4_3_3","sample4_4_3","sample4_5_3"],
    ["sample4_1_4","sample4_2_4","sample4_3_4","sample4_4_4","sample4_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}



function PlayMusic1(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE1 = new Howl({
    src: [
      "./music/sample1.ogg", "./music/sample1.m4a", "./music/sample1.mp3", "./music/sample1.ac3"
    ],
    sprite: {
      "sample1_1_1": [0, 8007.596371882086],
      "sample1_2_1": [10000,8007.596371882088],
      "sample1_3_1": [20000,8007.596371882088],
      "sample1_4_1": [30000,8007.596371882088],
      "sample1_5_1": [40000,8007.596371882088],
      "sample1_1_2": [50000,8007.596371882088],
      "sample1_2_2": [60000,8007.596371882088],
      "sample1_3_2": [70000,8007.596371882088],
      "sample1_4_2": [80000,8007.596371882088],
      "sample1_5_2": [90000,8007.596371882088],
      "sample1_1_3": [100000,8007.596371882088],
      "sample1_2_3": [110000,8007.596371882088],
      "sample1_3_3": [120000,8007.596371882088],
      "sample1_4_3": [130000,8007.596371882088],
      "sample1_5_3": [140000,8007.596371882088],
      "sample1_1_4": [150000,8007.596371882088],
      "sample1_2_4": [160000,8007.596371882088],
      "sample1_3_4": [170000,8007.596371882088],
      "sample1_4_4": [180000,8007.596371882088],
      "sample1_5_4": [190000,8007.596371882088],
    },
    onload: ()=>{
      // ボタンを有効にする
      document.getElementById('btn-play1').style.visibility = 'visible';
      document.querySelectorAll(".punch").forEach((element)=>{
        element.removeAttribute("disabled");
      });
    }
  });
  //[event] ボタンクリック時に実行
  document.querySelector("#btn-play1").addEventListener("click", ()=>{
    //section1
    SE1.play(MusicData[0]);
    //console.log("再生1");
    //section2
    setTimeout(()=>{
      SE1.play(MusicData[1]);
    }, 8007.596371882088);
    //console.log("再生2");
    /*//section3
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1000);
    //section4
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1500);
    //section5
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2000);
    //section6
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2500);
    */
   });
   // 中
 
   
}
  

function PlayMusic2(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE2 = new Howl({
    src: [
      "./music/sample2.ogg", "./music/sample2.m4a", "./music/sample2.mp3", "./music/sample2.ac3"
    ],
    sprite: {
      "sample2_1_1": [0, 8007.596371882086],
      "sample2_2_1": [10000,8007.596371882088],
      "sample2_3_1": [20000,8007.596371882088],
      "sample2_4_1": [30000,8007.596371882088],
      "sample2_5_1": [40000,8007.596371882088],
      "sample2_1_2": [50000,8007.596371882088],
      "sample2_2_2": [60000,8007.596371882088],
      "sample2_3_2": [70000,8007.596371882088],
      "sample2_4_2": [80000,8007.596371882088],
      "sample2_5_2": [90000,8007.596371882088],
      "sample2_1_3": [100000,8007.596371882088],
      "sample2_2_3": [110000,8007.596371882088],
      "sample2_3_3": [120000,8007.596371882088],
      "sample2_4_3": [130000,8007.596371882088],
      "sample2_5_3": [140000,8007.596371882088],
      "sample2_1_4": [150000,8007.596371882088],
      "sample2_2_4": [160000,8007.596371882088],
      "sample2_3_4": [170000,8007.596371882088],
      "sample2_4_4": [180000,8007.596371882088],
      "sample2_5_4": [190000,8007.596371882088],
    },
    onload: ()=>{
      // ボタンを有効にする
      document.getElementById('btn-play1').style.visibility = 'visible';
      document.querySelectorAll(".punch").forEach((element)=>{
        element.removeAttribute("disabled");
      });
    }
  });
  //[event] ボタンクリック時に実行
  document.querySelector("#btn-play1").addEventListener("click", ()=>{
    //section1
    SE2.play(MusicData[0]);
    console.log(MusicData[0]);
    //section2
    setTimeout(()=>{
      SE2.play(MusicData[1]);
    }, 22700.408163265307);
    //console.log("再生2");
    /*//section3
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1000);
    //section4
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1500);
    //section5
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2000);
    //section6
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2500);
    */
   });
   // 中
 
 
}

function PlayMusic3(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE3 = new Howl({
    src: [
      "./music/sample3.ogg", "./music/sample3.m4a", "./music/sample3.mp3", "./music/sample3.ac3"
    ],
    sprite: {
      "sample3_1_1": [0, 8007.596371882086],
      "sample3_2_1": [10000,8007.596371882088],
      "sample3_3_1": [20000,8007.596371882088],
      "sample3_4_1": [30000,8007.596371882088],
      "sample3_5_1": [40000,8007.596371882088],
      "sample3_1_2": [50000,8007.596371882088],
      "sample3_2_2": [60000,8007.596371882088],
      "sample3_3_2": [70000,8007.596371882088],
      "sample3_4_2": [80000,8007.596371882088],
      "sample3_5_2": [90000,8007.596371882088],
      "sample3_1_3": [100000,8007.596371882088],
      "sample3_2_3": [110000,8007.596371882088],
      "sample3_3_3": [120000,8007.596371882088],
      "sample3_4_3": [130000,8007.596371882088],
      "sample3_5_3": [140000,8007.596371882088],
      "sample3_1_4": [150000,8007.596371882088],
      "sample3_2_4": [160000,8007.596371882088],
      "sample3_3_4": [170000,8007.596371882088],
      "sample3_4_4": [180000,8007.596371882088],
      "sample3_5_4": [190000,8007.596371882088],
    },
    onload: ()=>{
      // ボタンを有効にする
      document.getElementById('btn-play1').style.visibility = 'visible';
      document.querySelectorAll(".punch").forEach((element)=>{
        element.removeAttribute("disabled");
      });
    }
  });
  //[event] ボタンクリック時に実行
  document.querySelector("#btn-play1").addEventListener("click", ()=>{
    //section1
    SE3.play(MusicData[0]);
    //section2
    setTimeout(()=>{
      SE3.play(MusicData[1]);
    }, 25521.63265306123);
    /*//section3
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1000);
    //section4
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1500);
    //section5
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2000);
    //section6
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2500);
    */
  });
  // 中

}

function PlayMusic4(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE1 = new Howl({
    src: [
      "./music/sample4.ogg", "./music/sample4.m4a", "./music/sample4.mp3", "./music/sample4.ac3"
    ],
    sprite: {
      "sample4_1_1": [0, 8007.596371882086],
      "sample4_2_1": [10000,8007.596371882088],
      "sample4_3_1": [20000,8007.596371882088],
      "sample4_4_1": [30000,8007.596371882088],
      "sample4_5_1": [40000,8007.596371882088],
      "sample4_1_2": [50000,8007.596371882088],
      "sample4_2_2": [60000,8007.596371882088],
      "sample4_3_2": [70000,8007.596371882088],
      "sample4_4_2": [80000,8007.596371882088],
      "sample4_5_2": [90000,8007.596371882088],
      "sample4_1_3": [100000,8007.596371882088],
      "sample4_2_3": [110000,8007.596371882088],
      "sample4_3_3": [120000,8007.596371882088],
      "sample4_4_3": [130000,8007.596371882088],
      "sample4_5_3": [140000,8007.596371882088],
      "sample4_1_4": [150000,8007.596371882088],
      "sample4_2_4": [160000,8007.596371882088],
      "sample4_3_4": [170000,8007.596371882088],
      "sample4_4_4": [180000,8007.596371882088],
      "sample4_5_4": [190000,8007.596371882088],
    },
    onload: ()=>{
      // ボタンを有効にする
      document.getElementById('btn-play1').style.visibility = 'visible';
      document.querySelectorAll(".punch").forEach((element)=>{
        element.removeAttribute("disabled");
      });
    }
  });
  //[event] ボタンクリック時に実行
  document.querySelector("#btn-play1").addEventListener("click", ()=>{
    //section1
    SE1.play(MusicData[0]);
    //section2
    setTimeout(()=>{
      SE1.play(MusicData[1]);
    }, 18416.326530612252);
    /*//section3
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1000);
    //section4
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1500);
    //section5
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2000);
    //section6
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2500);
    */
  });
  // 中

 
}
 
function PlayMusic5(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE1 = new Howl({
    src: [
      "./music/sample.ogg", "./music/sample.m4a", "./music/sample.mp3", "./music/sample.ac3"
    ],
    sprite: {
      "sample1_1": [0, 8042.65306122449],
      "sample1_2": [10000,8042.65306122449],
      "sample1_3": [20000,8042.65306122449],
      "sample1_4": [20000,8042.65306122449]
    },
    onload: ()=>{
      // ボタンを有効にする
      document.getElementById('btn-play1').style.visibility = 'visible';
      document.querySelectorAll(".punch").forEach((element)=>{
        element.removeAttribute("disabled");
      });
    }
  });
  //[event] ボタンクリック時に実行
  document.querySelector("#btn-play1").addEventListener("click", ()=>{
    //section1
    SE1.play("sample1_2");
    //section2
    setTimeout(()=>{
      SE1.play("sample1_1");
    }, 8042.65306122449);
    setTimeout(()=>{
      SE1.play("sample1_3");
    }, 16084.65306122449);
    /*//section3
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1000);
    //section4
    setTimeout(()=>{
      SE1.play("punch1");
    }, 1500);
    //section5
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2000);
    //section6
    setTimeout(()=>{
      SE1.play("punch1");
    }, 2500);
    */
  });
  // 中

 
}
 

