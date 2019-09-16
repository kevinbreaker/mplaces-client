<template>
  <label class="label">
    <gmap-autocomplete
      ref="complete"
      class="k-search"
      required
      placeholder=""
      :aria-label="`campo de ${labelName || 'Busca'}`"
      @place_changed="(ev) => $emit('placeChanged', ev)"
    ></gmap-autocomplete>
    <span class="span">{{ labelName }}</span>
    <i class="icon"
      ><img width="30px" :src="require('~/assets/search-outline.svg')" alt=""
    /></i>
  </label>
</template>

<script>
export default {
  props: {
    labelName: String,
    default: () => 'Buscar Local'
  }
}
</script>

<style lang="stylus" scoped>
span
  color red

.label
  position relative
  display block
  max-width 300px
  width 100%
  margin 12px 0

  .span
    color #000
    display inline-block
    text-transform capitalize
    font-weight 350
    position absolute
    margin-left 10px
    transition all 0.8s
    left 0
    top 10px

  .icon
    position absolute
    display inline-block
    background white
    top 5px
    right 10px

    &::before
      content ''
      position relative
      display inline-block
      width 2px
      height 30px
      right 5px
      background #aaa

  .k-search
    border none
    border-radius 8px
    font-size 18px
    padding 10px 10px 10px 5px
    display block
    max-width 300px
    height 40px
    width 100%
    outline none

    &[type='password']
      letter-spacing 4px
      font-size 1.4em

    &:focus
      transition all 0.3s
      border 2px #9c27b0 solid
      box-shadow 0 0 4px #9c279c, 0 0 6px #8f71ff

    &:focus ~ .span, &:valid ~ .span
      color #B7FBFF
      transition all 0.8s
      font-size 16px
      font-weight bold
      position absolute
      pointer-events none
      left 5px
      top -18px
</style>
