<template>
  <div class="page-detail">
    <van-nav-bar
      left-arrow
      right-text="保存"
      :title="pageTitle"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="scroll-area">
      <van-field :label-width="labelWidth" v-model="title" label="标题" placeholder="请输入标题" />
      <van-field
        :label-width="labelWidth"
        v-model="detail"
        label="内容"
        placeholder="请输入内容"
        type="textarea"
        autosize
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { NavBar, Field, Toast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import 'vant/es/toast/style'

export default defineComponent({
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
  },
  name: 'PageDetail',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const { type, id } = route.query

    const labelWidth = '3em'

    const todoItem = reactive({
      title: '',
      detail: '',
      id: new Date().getTime(),
    })

    if (type === 'detail' && id) {
      const item = store.state.todoList.find((item: any) => item.id == id)
      todoItem.title = item.title
      todoItem.detail = item.detail
      todoItem.id = item.id
    }

    const pageTitle = computed(() => {
      if (type === 'create') {
        return '新增笔记'
      } else if (type === 'detail') {
        const item = store.state.todoList.find((item: any) => item.id == id)
        return item.title
      } else {
        return ''
      }
    })

    const onClickLeft = () => {
      router.back()
    }

    const onClickRight = () => {
      if (todoItem.title && todoItem.detail) {
        if (type === 'create') {
          store.commit('addTodoItem', todoItem)
          Toast.success('保存成功')
          router.back()
        } else if (type === 'detail' && id) {
          store.commit('saveTodoItem', todoItem)
          Toast.success('保存成功')
          router.back()
        }
      } else {
        Toast('请填写标题或内容')
      }
    }

    return {
      ...toRefs(todoItem),
      pageTitle,
      labelWidth,
      onClickLeft,
      onClickRight,
    }
  },
})
</script>

<style lang="less" scoped>
.page-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .scroll-area {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  :deep(.van-nav-bar) {
    .van-icon {
      color: #6877ff;
      font-size: 20px;
    }
    .van-nav-bar__text {
      color: #6877ff;
    }
  }
}
</style>