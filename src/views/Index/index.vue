<template>
  <div class="page-index">
    <van-nav-bar title="笔记" />
    <div v-if="todoList.length" class="scroll-area">
      <van-swipe-cell v-for="item in todoList" :key="item.id">
        <template #left>
          <van-button square type="danger" text="删除" @click="handleDeleteItem(item)" />
        </template>
        <div class="item" @click="handleClickItem(item)">
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ formatDate(item.id) }}</div>
        </div>
        <template #right>
          <van-button square type="primary" text="复制内容" @click="handleCopyDetail(item)" />
        </template>
      </van-swipe-cell>
      <div class="reserve-block"></div>
    </div>
    <van-empty v-else description="请添加笔记" />
    <div class="float-icon" @click="toDetail">
      <div class="float-icon-inner">
        <van-icon name="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { NavBar, SwipeCell, Empty, Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import 'vant/es/toast/style'
import useClipboard from 'vue-clipboard3'
import _ from 'lodash'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'PageIndex',
  components: {
    [NavBar.name]: NavBar,
    [SwipeCell.name]: SwipeCell,
    [Empty.name]: Empty,
  },
  setup() {
    const { toClipboard } = useClipboard()
    const router = useRouter()
    const store = useStore()
    const todoList = computed(() => {
      const array = _.cloneDeep(store.state.todoList)
      array.sort((a, b) => {
        return b.id - a.id
      })
      return array
    })

    const handleClickItem = (item) => {
      router.push({
        name: 'PageDetail',
        query: {
          type: 'detail',
          id: item.id,
        },
      })
    }

    const handleDeleteItem = (item) => {
      store.commit('removeTodoItem', item)
    }

    const handleCopyDetail = async (item) => {
      try {
        await toClipboard(item.detail)
        Toast('复制成功')
      } catch (e) {
        Toast('复制失败')
      }
    }

    const toDetail = () => {
      router.push({
        name: 'PageDetail',
        query: {
          type: 'create',
        },
      })
    }

    const formatDate = (timestamp) => {
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    }

    return {
      toDetail,
      handleClickItem,
      handleDeleteItem,
      handleCopyDetail,
      formatDate,
      todoList,
    }
  },
})
</script>

<style lang="less" scoped>
.page-index {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .scroll-area {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 10px;
    .item {
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 10px;
      .title {
        font-size: 16px;
        margin-bottom: 6px;
      }
      .time {
        font-size: 12px;
        color: #a3a3a3;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    :deep(.van-swipe-cell__right) {
      right: -1px;
      .van-button {
        height: 100%;
      }
    }
    :deep(.van-swipe-cell__left) {
      left: -1px;
      .van-button {
        height: 100%;
      }
    }
    .reserve-block {
      height: 80px;
    }
  }
  .float-icon {
    display: inline-block;
    position: absolute;
    right: 30px;
    bottom: 30px;
    .float-icon-inner {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #6877ff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 2px 2px rgba(104, 119, 255, 0.5);
      /deep/ .van-icon {
        font-size: 30px;
        color: #fff;
      }
    }
  }
}
</style>