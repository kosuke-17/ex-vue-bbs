import { Article } from '@/types/Article';
import { Comment } from '@/types/Comment';
import Vue from 'vue';
import Vuex from 'vuex';
// envファイルに格納
const ARTICLE_API = process.env.VUE_APP_API_BASE_URL;
console.log(ARTICLE_API);

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, '佐藤', '佐藤さんの記事', []),
      new Article(2, '山田', '山田さんの記事', [
        new Comment(13, '山崎', '山崎さんのコメント', 2),
      ]),
      new Article(1, '伊藤', '伊藤さんの記事', [
        new Comment(12, '鈴木', '鈴木さんのコメント', 1),
        new Comment(11, '吉田', '吉田さんのコメント', 1),
      ]),
    ],
  }, // end state

  mutations: {
    /**
     * articlesに入力データを追加.
     * @param state - ステート
     * @param payload - 投稿者名と記事の内容
     */
    addArticle(state, payload): void {
      state.articles.unshift(
        new Article(
          state.articles[0].id + 1,
          payload.articleName,
          payload.articleContent,
          new Array<Comment>()
        )
      );
    },

    /**
     * 当てはまる記事にコメントを追加.
     * @param state - ステート
     * @param payload - 記事のID、コメント者名、コメントの内容
     */
    addComment(state, payload): void {
      const articleById = state.articles.filter(
        (article) => article.id == payload.articleId
      );

      // filterの返り値にはId一意のデータしかないため、0番目のIndexを入れている。
      // unshiftじゃなくてsplice(0,0,commentのデータ)もいける
      if (articleById) {
        articleById[0].commentList.unshift(
          new Comment(
            -1,
            payload.commentName,
            payload.commentContent,
            articleById[0].id
          )
        );
      } else {
        throw new Error('articleIdが存在しません');
      }
    },

    /**
     * 当てはまる記事の削除.
     * @param state - ステート
     * @param payload - 記事のID
     */
    // deleteArticle(state, payload): void {
    //   state.articles.splice(payload.articleIndex, 1);
    // },

    deleteArticleByfilter(state, payload) {
      state.articles = state.articles.filter(
        (article) => article.id != payload.articleId
      );
      console.log(state.articles);
    },
  },
  actions: {},
  getters: {
    /**
     * 投稿者名と記事の内容を返す.
     * @param state - ステート
     * @returns - 投稿者名と記事の内容
     */
    getArticles(state): Article[] {
      return state.articles;
    },
  },
  modules: {},
});

export default store;
