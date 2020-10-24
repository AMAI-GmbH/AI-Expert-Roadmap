<script>
export default {
  functional: true,
  render (h, { props, slots }) {
    return h('div',
      {
        class: ['bs-docs-example']
      },
      [
        slots().default
      ]
    )
  }
}
</script>

<style lang="stylus">
    .bs-docs-example
        position: relative;
        margin: 15px 0;
        padding: 39px 19px 14px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        > p 
            margin: 0px;
            > img
                display: block;
                margin-left: auto;
                margin-right: auto;
                max-width: 100%;
                width: auto;
                height: auto;
                vertical-align: middle;
                border: 0;
    .bs-docs-example:after
        content: "Example";
        position: absolute;
        top: -1px;
        left: -1px;
        padding: 3px 7px;
        font-size: 12px;
        font-weight: bold;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        color: #9da0a4;
        -webkit-border-radius: 4px 0 4px 0;
        -moz-border-radius: 4px 0 4px 0;
        border-radius: 4px 0 4px 0;
</style>