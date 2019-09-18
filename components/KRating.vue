<template>
  <div>
    <img
      v-for="(star, idx) in content"
      :key="idx"
      :src="star"
      alt="Star rating"
      width="30px"
    />
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({
    content: []
  }),
  watch: {
    rating(rating) {
      switch (~~rating) {
        case 0:
          return (this.content = [
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg')
          ])
        case 1:
          return (this.content = [
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg')
          ])
        case 2:
          return (this.content = [
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg')
          ])
        case 3:
          return (this.content = [
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star-none.svg'),
            require('~/assets/stars/star-none.svg')
          ])
        case 4:
          return (this.content = [
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star-none.svg')
          ])
        case 5:
          return (this.content = [
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg')
          ])
        default:
          return (this.content = () => [
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star.svg'),
            require('~/assets/stars/star-half.svg'),
            require('~/assets/stars/star-none.svg')
          ])
      }
    }
  }
}
</script>
