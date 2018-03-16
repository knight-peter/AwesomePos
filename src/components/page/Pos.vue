<template>
<div class="pos">
  <el-row>
    <el-col :span='7' class="l-container--left">
      <el-tabs class="m-tabs" type="card">
        <el-tab-pane label="点餐">
          <el-table :data="tableData" :stripe="true" show-summary  max-height="500">
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="count" label="数量" width="50"></el-table-column>
            <el-table-column prop="price" label="金额" width="70"></el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  <el-button type="text" size="small" @click="delSingGoods(scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="totalDiv g-ta--c">
            <small>数量：</small><b>{{totalCount}}</b>元
            <small>金额：</small><b>{{totalMoney}}</b>元
          </div>
          <div class="g-ta--c g-mt--10">
            <el-button type="warning">挂单</el-button>
            <el-button type="danger" @click="getAllGoods">删除</el-button>
            <el-button type="success" @click="checkout">结账</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="挂单">
          挂单
        </el-tab-pane>
        <el-tab-pane label="外卖">
          外卖
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="17" class="l-container--right">
      <div class="often-goods">
        <div class="title">常用商品</div>
        <div class="often-goods-list">
            <ul>
                <li v-for="item of oftenGoods" :key="item.goodsId" @click="addOrderList(item)">
                    <a href="javascript:;">
                      <span>{{item.goodsName}}</span>
                      <span class="o-price">￥{{item.price}}</span>
                    </a>
                </li>
            </ul>
        </div>
      </div>
      <div class="goods-type">
        <el-tabs>
          <el-tab-pane label="汉堡">
            <ul class='cookList'>
                <li v-for="goods of type0Goods" :key="goods.goodId" @click="addOrderList(goods)">
                    <a href="javascript:;">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </a>
                </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="小食">
            <ul class='cookList'>
                <li v-for="goods of type1Goods" :key="goods.goodId" @click="addOrderList(goods)">
                    <a href="javascript:;">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </a>
                </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="饮料">
            <ul class='cookList'>
                <li v-for="goods of type2Goods" :key="goods.goodId" @click="addOrderList(goods)">
                    <a href="javascript:;">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </a>
                </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="套餐">
            <ul class='cookList'>
                <li v-for="goods of type3Goods" :key="goods.goodId" @click="addOrderList(goods)">
                    <a href="javascript:;">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </a>
                </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      msg: "Hello AwesomePos Demo",
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount: 0,
      totalMoney: 0
    };
  },
  created() {
    axios
      .get("http://jspang.com/DemoApi/oftenGoods.php")
      .then(res => {
        console.log(res);
        this.oftenGoods = res.data;
      })
      .catch(err => {
        console.log("错误：", err);
      });
    //读取分类商品列表
    axios
      .get("http://jspang.com/DemoApi/typeGoods.php")
      .then(response => {
        console.log(response);
        //this.oftenGoods=response.data;
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
      .catch(error => {
        console.log(error);
        alert("网络错误，不能访问");
      });
  },
  methods: {
    addOrderList(goods) {
      this.totalCount = 0;
      this.totalMoney = 0;
      // 商品是否存在于订单列表中
      let isHave = false;
      for (let tr of this.tableData) {
        if (tr.goodsId === goods.goodsId) {
          isHave = true;
        }
      }
      //根据isHave的值判断订单列表中是否已经有此商品
      if (isHave) {
        // 改变列表中商品数量
        // filter,JavaScript的数组筛选方法,返回一个新数组
        let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
        console.log(arr);
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }
      this.getAllMoney();
    },
    // 删除单列商品
    delSingGoods(goods) {
      console.log("删除goods:", goods);
      // filter:数组筛选，筛选出goodsId与删除的数据不同的数据，从而实现删除的效果
      this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
      this.getAllMoney();
    },
    // 进行数量和价格的汇总计算
    getAllMoney() {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tableData) {
        this.tableData.forEach(element => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + element.price * element.count;
        });
      }
    },
    // 删除全部商品
    getAllGoods() {
      this.tableData = [];
      this.totalCount = 0;
      this.totalMoney = 0;
    },
    // 模拟结账
    checkout() {
      if (this.totalCount != 0) {
        // 这里写ajax
        this.$message({
          message: `收入：${
            this.totalMoney
          }元，结账成功，感谢你又为店里出了一份力`,
          type: "success"
        });
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
      } else {
        this.$message.error("不能空结，老板了解你急切的心情");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.pos {
  height: 100%;
  & > .el-row,
  .l-container--left,
  .l-container--right {
    height: 100%;
  }
}
.l-container--left {
  background-color: #fff;
}
.m-tabs {
  margin-top: 10px;
}
.g-ta--c {
  text-align: center;
}
.g-mt--10 {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list ul {
  display: flex;
  flex-flow: wrap;
  li {
    list-style: none;
    margin: 5px;
    flex-wrap: wrap;
  }
}
.often-goods-list a {
  text-decoration: none;
  display: block;
  border: 1px solid #e5e9f2;
  padding: 10px;
  background-color: #fff;
  &:hover {
    background-color: #fafafa;
    font-weight: 600;
  }
  &:active {
    background-color: #eff2f7;
  }
}
.o-price {
  color: #58b7ff;
}
.cookList {
  display: flex;
  flex-flow: wrap;
  li {
    list-style: none;
    margin: 2px;
  }
  a {
    display: block;
    border: 1px solid #e5e9f2;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    width: 205px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      img {
        opacity: 1;
      }
    }
  }
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
  img {
    display: block;
    opacity: 0.8;
  }
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.totalDiv {
  border-bottom: 1px solid #ebeef5;
  padding: 5px 0;
  b {
    margin: 0 5px;
    color: #f56c6c;
  }
}
</style>
