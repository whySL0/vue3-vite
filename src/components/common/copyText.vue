<!--
 * @Author: linglingling
-->
<template>
  <div class="copyTextTool">
    <a class="pointer" :title="copyText" @click="copy">
      {{ copyText }}
    </a>
    <!-- <div class="tooltip bottom">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{ copyText }}
      </div>
    </div> -->
  </div>
</template>
<script>
  export default {
    name: "CopyText",
    props: {
      copyText: {
        type: String,
        value: ""
      }
    },
    data(){
      return{
      }
    },
    mounted() {
      // $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
      copy() {
        if(this.copyText) {
          let oInput = document.createElement("input")
          oInput.value = this.copyText
          document.body.appendChild(oInput)
          oInput.select();
          document.execCommand("Copy");
          oInput.style.display = "none"
          this.$alert.success('复制成功！')
        }
      }
    }
  }
</script>
<style lang="scss">
// .hoverClass{
//   .tooltip {
//     display: none;
//   }
//   &:hover {
//     .tooltip {
//       display: block;
//     }
//   }
// }
  .copyTextTool {
    display: inline-block;
    position: relative;
    .tooltip.bottom {
      padding: 2px 0;
      margin-top: -1px;
    }
    .tooltip-inner {
      padding: 0.5rem;
      max-width: 50rem;
    }
    .tooltip-inner::before {
      content: '复制';
      background: #fff;
      color: #00428e;
      padding: 0.4rem 0.5rem 0.3rem 0.3rem;
      border-left: 0.2rem solid #00428e;
      border-top: 0.1rem solid black;
      border-bottom: 0.1rem solid black;
      margin-right: 0.3rem !important;
      position: absolute;
      border-radius: 0.2rem 0 0 0.2rem;
      top: 0.2rem;
      left: -2.5rem;
      display: none;
    }

  }

</style>
