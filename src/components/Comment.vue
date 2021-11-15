<template>
  <!-- 入力後に入力値がそのままだが、typeがぼたんで、クリックイベントを発生させてるためそのままでいい？ -->
  <form>
    <div class="errorCommment">
      {{ errorMessage }}
      <br />
      {{ nameErrorMessage }}
    </div>
    名前：
    <br />
    <input type="text" v-model="name" />
    <br />
    コメント：
    <br />
    <textarea rows="5" cols="33" v-model="content" />
    <br />
    <button type="button" @click="onaddcomment()">コメント投稿</button>
  </form>
</template>

<script lang="ts">
import store from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CommentsComp extends Vue {
  @Prop() private articleId!: string;
  private name = '';
  private content = '';
  private errorMessage = '';
  private nameErrorMessage = '';
  private newArticleId = 0;

  /**
   * 当てはまる記事にコメントを追加.
   *
   * ＠remarks 名前、記事が未入力の場合、エラーメッセージを表示させる
   *           名前が50文字を超えていたら、エラーメッセージを表示させる
   */
  // 空白だったら何が好ましい
  onaddcomment(): void {
    this.newArticleId = Number(this.articleId);

    // コメントの未入力エラーが考えられるため、returnなし
    if (this.name.length > 50) {
      this.nameErrorMessage = '名前は50文字以内で入力してください';
    }
    // 名前とコメント両方が存在すればtrueの処理
    if (this.name && this.content) {
      store.commit('addComment', {
        articleId: this.newArticleId,
        commentName: this.name,
        commentContent: this.content,
      });
    } else {
      this.errorMessage = '名前またはコメントを入力してください';
    }
  }
}
</script>

<style scoped>
.errorCommment {
  color: red;
}
</style>

if (this.name && this.content) { store.commit('addComment', { articleId:
this.newArticleId, commentName: this.name, commentContent: this.content, }); }
else { this.errorMessage = '名前またはコメントを入力してください'; }
