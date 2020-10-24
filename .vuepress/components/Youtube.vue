<script>
export default {
  functional: true,
  render (h, { props, slots }) {
    return h('div',
      {
        class: ['videoWrapper']
      },
      [
        slots().default
      ]
    )
  }
}
</script>

<style lang="stylus">
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
}
.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>