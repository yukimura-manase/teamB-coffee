import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coffeeList : [
      {ID:1, name:'Gorgeous4サンド', contents:'人気の定番具材「ハム」と「チキン」をセットにした食べごたえ抜群のサンドイッチです', priceM:480, priceL:700, imageURL:require('@/assets/img_coffee/1.jpg')},
      {ID:2, name:'エスプレッソフラペチーノ', contents:'ひと口目に感じるエスプレッソは「リストレット」という方法で抽出した力強い香りと優しい苦味を、ふた口目は全体を混ぜて、こだわりのクリームから来るアフォガートのような味わいをお楽しみください。リフレッシュしたい時や、ほっとひと息つきたい時にも、何度でも飲みたくなるフラペチーノ®です。', priceM:530, priceL:650, imageURL:require('@/assets/img_coffee/2.jpg')},
      {ID:3, name:'Specialキャラメルドーナッツ', contents:'ドーナツ生地の中に、なめらかで風味豊かなキャラメルフィリングを入れ、仕上げにキャラメルのビター感と香ばしさが楽しめるキャラメルコーティングをかけました。', priceM:250, priceL:500, imageURL:require('@/assets/img_coffee/3.jpg')},
      {ID:4, name:'チョコクッキー', contents:'ソフトな食感のクッキー生地には、小麦の香ばしさが感じられるよう全粒粉を入れ、砂糖の一部にはブラウンシュガーを使い、コクのある甘さをプラスしています。風味豊かなスターバックスオリジナルのチョコレートチャンクがごろごろ入っていて、どこを食べてもチョコレートの味わいを存分に楽しめます。ショートサイズのマグカップの上に乗せられるくらいのサイズは、コーヒーと一緒に楽しむのにもぴったりです。', priceM:190, priceL:300, imageURL:require('@/assets/img_coffee/4.jpg')},
      {ID:5, name:'カフェモカ', contents:'エスプレッソにほろ苦いチョコレートシロップとミルクを加え、ホットビバレッジにはホイップクリームをトッピング。ちょっとした贅沢を楽しみたい方におすすめです。', priceM:400, priceL:520, imageURL:require('@/assets/img_coffee/5.jpg')},
      {ID:6, name:'カフェラテ', contents:'最も人気のあるエスプレッソ ビバレッジ。リッチなエスプレッソにスチームミルクを注ぎ、フォームミルクを丁寧にトッピングしました。ミルキーな味わいで気持ちを温かくしてくれます。', priceM:340, priceL:460, imageURL:require('@/assets/img_coffee/6.jpg')},
      {ID:7, name:'カプチーノ', contents:'リッチなエスプレッソに一気にミルクを注ぐことで、一口飲んだときからコーヒー感が感じられるビバレッジです。ベルベットのようにきめ細かいフォームミルクをお楽しみください。', priceM:340, priceL:460, imageURL:require('@/assets/img_coffee/7.jpg')},
      {ID:8, name:'キャラメルマキアート', contents:'バニラシロップとスチームミルクのコンビネーションになめらかなフォームミルクをたっぷりのせ、その上からエスプレッソを注いでアクセントを付けました。仕上げにオリジナルキャラメルソースをトッピングしています。', priceM:390, priceL:510, imageURL:require('@/assets/img_coffee/8.jpg')},
      {ID:9, name:'キャラメルフラペチーノ', contents:'コーヒー、ミルク、キャラメルシロップを氷とブレンドした、多くのお客様に愛されているフローズン ビバレッジです。トッピングしたホイップクリームとキャラメルソースと混ぜながら、豊かでほんのり香ばしいキャラメルの風味をお楽しみください。', priceM:490, priceL:570, imageURL:require('@/assets/img_coffee/9.jpg')},
      {ID:10, name:'バニラ クリーム フラペチーノ', contents:'ミルクとバニラシロップを氷とブレンドし、ホイップクリームをトッピングした、クリーミーな味わいのフローズン ビバレッジ。真っ白な見た目も爽やかです。ミルクとバニラシロップというシンプルな組み合わせはいろいろなカスタマイズとも好相性。', priceM:490, priceL:570, imageURL:require('@/assets/img_coffee/10.jpg')},
      {ID:11, name:'ダークモカフラペチーノ', contents:'コーヒー、ミルク、ダークチョコレートパウダー、そして人気のチョコレートチップを氷とブレンドした、チョコレートラバーズに人気のフローズンビバレッジ。コーヒーとダークチョコレートのほろ苦い味わいと、チョコレートチップの食感が織り成すハーモニーは、ブラックコーヒーファンにも支持されています。', priceM:500, priceL:580, imageURL:require('@/assets/img_coffee/11.jpg')},
      {ID:12, name:'抹茶クリームフラペチーノ', contents:'世界中で様々な形で飲用されている抹茶ですが、スターバックスではミルクと甘みを加えて氷でブレンドしたリフレッシングなフラペチーノ®に仕上げました。', priceM:490, priceL:570, imageURL:require('@/assets/img_coffee/12.jpg')},
      {ID:13, name:'ドリップコーヒー', contents:'世界中のコーヒー産地から厳選された高品質のアラビカ種コーヒー豆を使用したスターバックスの定番商品です。バラエティあふれるコーヒー豆を通して、スターバックスのコーヒージャーニーをお楽しみください。異なるローストレベルのコーヒーを日替わりでご用意していますので、お気に入りの1杯を見つけてみませんか。', priceM:290, priceL:410, imageURL:require('@/assets/img_coffee/13.jpg')},
      {ID:14, name:'アイスコーヒー', contents:'熱を加えずに14時間かけてゆっくりと水で抽出したコールドブリュー コーヒー。香り高い風味が引き出されるよう、特別にブレンド、ローストしたコーヒー豆を使用しています。豊かな味わいとなめらかな口あたりをお楽しみください。', priceM:330, priceL:450, imageURL:require('@/assets/img_coffee/14.jpg')},
      {ID:15, name:'アメリカン', contents:'エスプレッソに熱いお湯を注いだ、すっきりとしたのどごしのコーヒーです。ドリップ コーヒーのお好きな方にもおすすめです。', priceM:310, priceL:430, imageURL:require('@/assets/img_coffee/15.jpg')},
      {ID:16, name:'エスプレッソ', contents:'キャラメルのような甘く力強い味とナッツを感じさせる後味。スターバックスのすべてのエスプレッソ ビバレッジに使われているエスプレッソです。どうぞ、お早めにお召し上がりください。', priceM:310, priceL:350, imageURL:require('@/assets/img_coffee/16.jpg')},
      {ID:17, name:'ナッティホワイトモカ', contents:'ホワイトチョコレートとヘーゼルナッツに香り高いエスプレッソを加えた風味豊かなホワイト モカ。ホイップクリームをツリーに見立て、ナッツ&ホワイトチョコレートソースのリボンと、3色のチョコレート、シルバーのアラザンをイルミネーションのようにちりばめました。ホリデーシーズンにぴったりのあたたかな一杯で、特別なひと時をお楽しみください。', priceM:450, priceL:570, imageURL:require('@/assets/img_coffee/17.jpg')},
      {ID:18, name:'ジンジャーブレッドラテ', contents:'スターバックスのホリデーといえばやっぱりジンジャーブレッド ラテ、という人も多いのではないでしょうか。ジンジャーブレッドクッキーをイメージした、ほんのり甘くてスパイシーな風味は、この時期にしか味わえない特別なビバレッジです。体の中からじんわりとあたためてくれる一杯で、ほっとリラックスしたひと時をお過ごしください。', priceM:450, priceL:570, imageURL:require('@/assets/img_coffee/18.jpg')},
  ],
    login_user:null
  },
  mutations: {
    setLoginUser (state,user){
      state.login_user = user
    },
    deleteLoginUser(state,){
      state.login_user = null
    }
  },
  actions: {
    setLoginUser({commit},user){
      commit('setLoginUser',user)
    },
    login(){
      //Googleプロジェクトオブジェクトのインスタンスの作成
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      //ログインページ（google）のにリダイレクトしてログインする為のコード
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout(){
      firebase.auth().signOut()
    },
    deleteLoginUser({commit}){
      commit('deleteLoginUser')
    }
  },
  getters: {
    //coffeeListのidとparams.idが一致したものを返す
    getItem: (state) => (id) => state.coffeeList.find((item) => item.ID === id),
    } 
})
