<template>
  <section class="container">
    <div class="content top__what">
      <h2>ナニコレ？</h2>
      <div class="body">
        <p>勤怠管理をちょっと楽にしてくれるメモアプリ。</p>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/login')
    }
  }
}
</script>

<style scoped>
  .content .body {
    padding: 5px 20px;
  }

  .top__what h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/what_is_memokin.png");
    background-size: contain;
  }
</style>
