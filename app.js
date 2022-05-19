//一定時間毎に閾値を超えた数を記録
var overTreshhold = new Array(5);
overTreshhold.fill(0);
//運動強度を記録
var motion = new Array(5);
motion.fill(0);
//セクションごとの音楽名を記録
var MusicData = new Array(5);
MusicData.fill(0);
var count = new Array(5);
count.fill(0)


//ファイル読み込み時に実行
document.getElementById('file').onchange = function(){
  var musicselect;
  //読み込むファイル
  var file = this.files[0]; //1つ目のファイル
  //FileReaderのオブジェクトを作成
  var reader = new FileReader();
  //file読み込み完了時のイベント
  reader.onload = function(){    
    var flag = true;
    //読み込んだ文字列データをjsonとして扱い、オブジェクトへ変換
    const obj = JSON.parse(this.result);
    //プロパティ毎に計算
    for(var data in obj){
      var Data = obj[data];
      //オブジェクトの中で時間がn秒~n+?秒の時、閾値以上の値がいくつかを計算
      if(Data["Time"] >= 3 && Data["Time"] <= 12){     //2秒以下
        overTreshhold[0] += Data["Accel"]; 
        count[0] += 1;
      }else if(Data["Time"] > 12 && Data["Time"] <= 24){   //2秒より上、4秒以下
        overTreshhold[1] += Data["Accel"]; 
        count[1] += 1;
      }else if(Data["Time"] > 24 && Data["Time"] <= 36){   //2秒より上、4秒以下
        overTreshhold[2] += Data["Accel"]; 
        count[2] += 1;
      }else if(Data["Time"] > 36 && Data["Time"] <= 48){   //2秒より上、4秒以下
        overTreshhold[3] += Data["Accel"]; 
        count[3] += 1;
      }else if(Data["Time"] > 48 && Data["Time"] <= 60){   //2秒より上、4秒以下
        overTreshhold[4] += Data["Accel"]; 
        count[4] += 1;
      }
      



      /*
      if(Data["Time"] <= 12){     //2秒以下
        if(Data["Accel"] >= treshhold){   //計測データが1以上のとき（閾値が1）
          overTreshhold[0] = overTreshhold[0] + 1; //閾値以上のデータ数をセクション1に代入
        }
      }else if(Data["Time"] > 12 && Data["Time"] <= 24){   //2秒より上、4秒以下
        if(Data["Accel"] >= treshhold){    //計測データが1以上のとき（閾値が1）
          overTreshhold[1] = overTreshhold[1] + 1; //閾値以上のデータ数をセクション2に代入
        }
      }else if(Data["Time"] > 24 && Data["Time"] <= 36){   //2秒より上、4秒以下
        if(Data["Accel"] >= treshhold){    //計測データが1以上のとき（閾値が1）
          overTreshhold[2] = overTreshhold[2] + 1; //閾値以上のデータ数をセクション2に代入
        }
      }else if(Data["Time"] > 36 && Data["Time"] <= 48){   //2秒より上、4秒以下
        if(Data["Accel"] >= treshhold){    //計測データが1以上のとき（閾値が1）
          overTreshhold[3] = overTreshhold[3] + 1; //閾値以上のデータ数をセクション2に代入
        }
      }else if(Data["Time"] > 48 && Data["Time"] <= 60){   //2秒より上、4秒以下
        if(Data["Accel"] >= treshhold){    //計測データが1以上のとき（閾値が1）
          overTreshhold[4] = overTreshhold[4] + 1; //閾値以上のデータ数をセクション2に代入
        }
      }
      */
    }
    for(var i=0; i<5;i++){
      overTreshhold[i]=overTreshhold[i]/count[i]
    }
    console.log("平均値：" + overTreshhold[0]);
    console.log("平均値：" + overTreshhold[1]);
    console.log("平均値：" + overTreshhold[2]);
    console.log("平均値：" + overTreshhold[3]);
    console.log("平均値：" + overTreshhold[4]);



    //一定時間毎の運動強度を計算
    for(var i=0; i<5; i++){
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
    }

    console.log(MusicData);
    
    
    console.log("musicselect:"+(musicselect));
    //音楽再生関数へ
    switch (musicselect){
      case 0:
        PlayMusic1();
      case 1:
        console.log("再生1");
        PlayMusic2();
      case 2:
        PlayMusic3();
    }
  };
  //読み込みを実行
  reader.readAsText(file);
}

//一定時間毎の運動強度を計算
function calc_Exercise(overTreshhold){
  var section = 0;
  if(overTreshhold <= 1.1){
    section=0;
  }else if(overTreshhold >1.1 && overTreshhold <=1.4){
    section=1;
  }else if(overTreshhold >1.4 && overTreshhold <=2.5){
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
    ["preset1_1_1","preset1_2_1","preset1_3_1","preset1_4_1","preset1_5_1"],
    ["preset1_1_2","preset1_2_2","preset1_3_2","preset1_4_2","preset1_5_2"],
    ["preset1_1_3","preset1_2_3","preset1_3_3","preset1_4_3","preset1_5_3"],
    ["preset1_1_4","preset1_2_4","preset1_3_4","preset1_4_4","preset1_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}
//セクションごとの音楽選択関数（music2）
function Selection2(){
  const music = [
    ["preset2_1_1","preset2_2_1","preset2_3_1","preset2_4_1","preset2_5_1"],
    ["preset2_1_2","preset2_2_2","preset2_3_2","preset2_4_2","preset2_5_2"],
    ["preset2_1_3","preset2_2_3","preset2_3_3","preset2_4_3","preset2_5_3"],
    ["preset2_1_4","preset2_2_4","preset2_3_4","preset2_4_4","preset2_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}
//セクションごとの音楽選択関数（music3）
function Selection3(){
  const music = [
    ["preset3_1_1","preset3_2_1","preset3_3_1","preset3_4_1","preset3_5_1"],
    ["preset3_1_2","preset3_2_2","preset3_3_2","preset3_4_2","preset3_5_2"],
    ["preset3_1_3","preset3_2_3","preset3_3_3","preset3_4_3","preset3_5_3"],
    ["preset3_1_4","preset3_2_4","preset3_3_4","preset3_4_4","preset3_5_4"]
  ]

  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]][i];
  }
}




function PlayMusic1(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE1 = new Howl({
    src: [
      "./music/preset1.ogg", "./music/preset1.m4a", "./music/preset1.mp3", "./music/preset1.ac3"
    ],
    sprite: {
      "preset1_1_1": [0,8042.65306122449],
      "preset1_1_2": [10000,8042.6530612244915],
      "preset1_1_3": [20000,8042.6530612244915],
      "preset1_1_4": [30000,8042.6530612244915],
      "preset1_2_1": [40200,8042.6530612244915],
      "preset1_2_2": [50200,8042.6530612244915],
      "preset1_2_3": [60200,8128.004535147397],
      "preset1_2_4": [70200,8042.653061224484],
      "preset1_3_1": [80200,8085.351473922899],
      "preset1_3_2": [90200,7885.351473922899],
      "preset1_3_3": [100200,8085.351473922899],
      "preset1_3_4": [110200,8085.351473922899],
      "preset1_4_1": [120200,8042.653061224484],
      "preset1_4_2": [130200,8042.653061224484],
      "preset1_4_3": [140200,8042.653061224484],
      "preset1_4_4": [150200,8042.653061224484],
      "preset1_5_1": [160200,10581.337868480716],
      "preset1_5_2": [172200,10581.337868480716],
      "preset1_5_3": [184200,10581.337868480716],
      "preset1_5_4": [196200,10581.337868480716]
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
    }, 8042.65306122449);
    setTimeout(()=>{
      SE1.play(MusicData[2]);
    }, 15884);
    setTimeout(()=>{
      SE1.play(MusicData[3]);
    }, 23769);
    setTimeout(()=>{
      SE1.play(MusicData[4]);
    }, 31611);
   
   });
   // 中
 
   
}
  

function PlayMusic2(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE2 = new Howl({
    src: [
      "./music/preset2.ogg", "./music/preset2.m4a", "./music/preset2.mp3", "./music/preset2.ac3"
    ],
    sprite: {
      "preset2_1_1": [0,7744.013605442177],
      "preset2_1_2": [9000,7744.013605442177],
      "preset2_1_3": [18000,7786.666666666669],
      "preset2_1_4": [27000,7786.666666666669],
      "preset2_2_1": [36200,7893.333333333331],
      "preset2_2_2": [45200,7893.333333333331],
      "preset2_2_3": [54200,7893.333333333331],
      "preset2_2_4": [63200,7893.333333333331],
      "preset2_3_1": [72200,7786.6666666666615],
      "preset2_3_2": [81200,7808.00453514739],
      "preset2_3_3": [90200,7808.00453514739],
      "preset2_3_4": [99200,7808.00453514739],
      "preset2_4_1": [108200,7680.000000000007],
      "preset2_4_2": [117200,7680.000000000007],
      "preset2_4_3": [126200,7680.000000000007],
      "preset2_4_4": [135200,7680.000000000007],
      "preset2_5_1": [144200,8789.319727891154],
      "preset2_5_2": [154200,8789.319727891154],
      "preset2_5_3": [164200,8853.333333333325],
      "preset2_5_4": [174200,8789.319727891154]
    },
    onload: ()=>{
      // ボタンを有効にする
      console.log("再生1");
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
    }, 7744.013605442177);
    //console.log("再生2");
    setTimeout(()=>{
      SE2.play(MusicData[2]);
    }, 15437);
    setTimeout(()=>{
      SE2.play(MusicData[3]);
    }, 23023);
    setTimeout(()=>{
      SE2.play(MusicData[4]);
    }, 30503);
   });
   // 中
 
 
}

function PlayMusic3(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE3 = new Howl({
    src: [
      "./music/preset3.ogg", "./music/preset3.m4a", "./music/preset3.mp3", "./music/preset3.ac3"
    ],
    sprite: {
      "preset3_1_1": [0,7594.671201814059],
      "preset3_1_2": [9000,7594.671201814059],
      "preset3_1_3": [18000,7594.671201814059],
      "preset3_1_4": [27200,7594.671201814059],
      "preset3_2_1": [36200,7445.351473922905],
      "preset3_2_2": [45200,7445.351473922905],
      "preset3_2_3": [54200,7359.999999999999],
      "preset3_2_4": [63200,7359.999999999999],
      "preset3_3_1": [72200,7445.351473922898],
      "preset3_3_2": [81200,7445.351473922898],
      "preset3_3_3": [90200,7445.351473922898],
      "preset3_3_4": [99200,7445.351473922898],
      "preset3_4_1": [108200,7445.351473922898],
      "preset3_4_2": [117200,7445.351473922898],
      "preset3_4_3": [126200,7488.004535147383],
      "preset3_4_4": [135200,7488.004535147383],
      "preset3_5_1": [144200,11797.34693877552],
      "preset3_5_2": [157200,12800.000000000011],
      "preset3_5_3": [171200,12885.351473922896],
      "preset3_5_4": [185200,12885.351473922896]
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
    console.log("saisei")
    SE3.play(MusicData[0]);
    //section2
    setTimeout(()=>{
      SE3.play(MusicData[1]);
    }, 7294.671201814059);
    setTimeout(()=>{
      SE3.play(MusicData[2]);
    }, 14453);
    setTimeout(()=>{
      SE3.play(MusicData[3]);
    }, 21698);
    setTimeout(()=>{
      SE3.play(MusicData[4]);
    }, 28943);
  });
  // 中

}