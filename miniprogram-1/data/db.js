var articles = [
  {
    articleId: '0',
    author: 'Tom',
    time: '两天前',
    avatar: '/images/avatar/7.jpg',
    date: '2020-04-23',
    title: '我是文章标题1',
    image: '/images/article/a1.jpg',
    desc: '我是描述1',
    star: '20',
    view: '30',
    content: '我是文章一的内容',
    music:{
      src:'http://music.163.com/song/media/outer/url?id=1436709403.mp3',
      title:'夏天的风',
      singer:'火羊瞌睡了',
      coverImgUrl:'http://p1.music.126.net/rFUKVdOjqxgwAT6Zi6qv7A==/109951164906689206.jpg?param=130y130'
    }
  },
  {
    articleId: '1',
    author: 'Jack',
    time: '三天前',
    avatar: '/images/avatar/u1.jpg',
    date: '2020-04-23',
    title: '我是文章标题2',
    image: '/images/article/a2.jpg',
    desc: '我是描述2',
    star: '20',
    view: '30',
    content: '我是文章二的内容',
    music: {
      src: 'http://music.163.com/song/media/outer/url?id=1442587684.mp3',
      title: '旁若无人',
      singer: '黄霄雲',
      coverImgUrl: 'http://p2.music.126.net/sxPVS71OvJ0i5HeZijKXtg==/109951164929105532.jpg?param=130y130'
    }
  }
]
module.exports = {
  articles: articles
}