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
    //音楽再生関数へ
    switch (musicselect){
      case 1:
        PlayMusic1();
      case 2:
        PlayMusic2();
      case 3:
        PlayMusic3();
      case 4:
        PlayMusic4();
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
  const music = ["sample3_1","sample3_2","sample3_3","sample3_4"]
  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]];
  }
}
//セクションごとの音楽選択関数（music2）
function Selection2(){
  const music = ["sample4_1","sample4_2","sample4_3","sample4_4"]
  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]];
  }
}
//セクションごとの音楽選択関数（music3）
function Selection3(){
  const music = ["sample5_1","sample5_2","sample5_3","sample5_4"]
  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]];
  }
}
//セクションごとの音楽選択関数（music4）
function Selection4(){
  const music = ["sample3_1","sample3_2","sample3_3","sample3_4"]
  for(var i=0;i<MusicData.length;i++){
    MusicData[i] = music[motion[i]];
  }
}


/*
// インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
const SE1 = new Howl({
  src: [
    "demo.ogg", "demo.m4a", "demo.mp3", "demo.ac3"
  ],
  sprite: {
    "punch1": [   0,  3271],  // 1曲目
    "punch2": [5000,  35000],   // 2曲目
    },
  onload: ()=>{
    // ボタンを有効にする
    document.querySelectorAll(".punch").forEach((element)=>{
      element.removeAttribute("disabled");
    });
  }
});
*/



function PlayMusic1(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE1 = new Howl({
    src: [
      "sample3.ogg", "sample3.m4a", "sample3.mp3", "sample3.ac3"
    ],
    sprite: {
      "sample3_4": [   0,  18938.775510204083],  // 1曲目
      "sample3_3": [20000,  38991.020408163266],   // 2曲目
      "sample3_2": [40000,  59382.85714285715],
      "sample3_1": [61000,  79416.326530612252]
      },
    onload: ()=>{
      // ボタンを有効にする
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

function PlayMusic2(){
  // インスタンスを各段階毎に複数生成　例)SE1, SE2, SE3
  const SE2 = new Howl({
    src: [
      "sample4.ogg", "sample4.m4a", "sample4.mp3", "sample4.ac3"
    ],
    sprite: {
      "sample4_4": [   0,  22857.14285714286],  // 1曲目
      "sample4_3": [24000,  46857.142857142862],   // 2曲目
      "sample4_2": [48000,  70700.408163265307],  // 1曲目
      "sample4_1": [72000,  94700.408163265307]   // 2曲目
      },
    onload: ()=>{
      // ボタンを有効にする
      document.querySelectorAll(".punch").forEach((element)=>{
        element.removeAttribute("disabled");
      });
    }
  });
  //[event] ボタンクリック時に実行
  document.querySelector("#btn-play1").addEventListener("click", ()=>{
    //section1
    SE2.play(MusicData[0]);
    //section2
    setTimeout(()=>{
      SE2.play(MusicData[1]);
    }, 22700.408163265307);
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
      "sample5.ogg", "sample5.m4a", "sample5.mp3", "sample5.ac3"
    ],
    sprite: {
      "sample5_4": [    0,  25600],  // 1曲目
      "sample5_3": [27000,  25652.24489795918],   // 2曲目
      "sample5_2": [54000,  25521.63265306123],  // 1曲目
      "sample5_1": [81000,  25521.63265306123]
      },
    onload: ()=>{
      // ボタンを有効にする
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
      "sample3.ogg", "sample3.m4a", "sample3.mp3", "sample3.ac3"
    ],
    sprite: {
      "sample3_4": [   0,  18938.775510204083],  // 1曲目
      "sample3_3": [20000,  38991.020408163266],   // 2曲目
      "sample3_2": [40000,  59382.85714285715],
      "sample3_1": [61000,  79416.326530612252]
      },
    onload: ()=>{
      // ボタンを有効にする
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
 
