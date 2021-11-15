<template>
  <div>
    <div>
      <form>
        <div class="errorCommment">
          {{ errorMessage }}
          <br />
          {{ nameErrorMessage }}
        </div>
        投稿者名：<input type="text" v-model="name" />
        <br />
        <br />
        投稿内容：<textarea rows="5" cols="33" v-model="content" />
        <br />
        <button type="button" @click="onaddarticle">記事投稿</button>
      </form>
    </div>
    <hr />
    <div v-for="article of getArticlesList" :key="article.id">
      投稿者名：
      <span>{{ article.name }}</span>
      投稿内容：
      <pre>{{ article.content }}</pre>
      <button type="button" @click="ondeleteArticle(article.id)">
        記事削除
      </button>
      <div v-for="comment of article.commentList" :key="comment.id">
        コメント者名：<span>{{ comment.name }}</span>
        コメント内容：
        <pre>{{ comment.content }}</pre>
      </div>
      <CommentsComp :article-id="article.id"></CommentsComp>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { Article } from '@/types/Article';
import { Component, Vue } from 'vue-property-decorator';
import CommentsComp from '../components/Comment.vue';

@Component({
  components: { CommentsComp },
})
export default class BbsComp extends Vue {
  private name = '';
  private content = '';
  private errorMessage = '';
  private nameErrorMessage = '';

  /**
   * 記事を削除
   */
  // ondeleteArticle(index: number): void {
  //   store.commit('deleteArticle', {
  //     articleIndex: index,
  //   });
  // }
  ondeleteArticle(articleId: number): void {
    store.commit('deleteArticleByfilter', {
      articleId: articleId,
    });
  }

  /**
   * 記事を追加.
   *
   * ＠remarks 名前、記事が未入力の場合、エラーメッセージを表示させる.
   *           名前が50文字を超えていたら、エラーメッセージを表示させる.
   */
  onaddarticle(): void {
    // コメントの未入力エラーが考えられるため、returnなし
    if (this.name.length > 50) {
      this.nameErrorMessage = '名前は50文字以内で入力してください';
    }
    // 名前とコメント両方が存在すればtrueの処理
    if (this.name && this.content) {
      store.commit('addArticle', {
        articleName: this.name,
        articleContent: this.content,
      });
    } else {
      this.errorMessage = '名前またはコメントを入力してください';
    }
  }
  /**
   * 記事の情報を取得して表示.
   */
  get getArticlesList(): Article[] {
    return store.getters.getArticles;
  }
}
</script>

<style scoped>
.errorCommment {
  color: red;
}
</style>
