<template>
    <div class="management">
        <header>
            <h1>易果生鲜后台管理系统</h1>
        </header>
        <main>
            <aside :class= "[navOpen ? '' : 'toggle']">
                <span>
                    <a href="javascript:" @click="contraction">
                        <icon name = "tasks"></icon>
                    </a>
                </span>
               <ul class="nav">
                 <li v-for="(obj,i) in nav"  class="joan-nav">
                   <div  @click="toggleNavItem($event)">
                     <a href="javascript:">
                      <icon :name=obj.icon></icon>
                      <span>{{obj.item}}</span>
                   </a>
                    <icon name="angle-left"></icon>

                   </div>
                   
                   <ul class="nav_item" :class= "[isOpen ? '' : 'active']">
                     <li v-for="(item,i) in obj.file">
                       <router-link :to=item.path @click="listStatus($event)">
                       {{item.name}}
                       </router-link>
                     </li>
                   </ul>
                   </li>
               </ul>
            </aside>
            <section :class= "[navOpen ? '' : 'sec']">
                <router-view>

              </router-view>
              
            </section>
        </main>
    </div>
</template>

<script>
import $ from "jquery";
import http from "../../lib/httpclient";
export default {
  data() {
    return {
      navOpen: true,
      isOpen: true,
      nav: [
        {
          item: "档案管理",
          icon: "file",
          file: [
            { name: "客户档案", path: "/management/clients" },
            { name: "产品档案", path: "/management/products" },
            { name: "供应商档案", path: "/management/supplier" },
            { name: "人事档案", path: "/management/personnel" }
          ]
        },
        {
          item: "系统设置",
          icon: "cog",
          file: [{ name: "修改密码", path: "/management/setting" }]
        }
      ]
    };
  },
  methods: {
    contraction() {
      $("aside").attr("class", "toggle");
      // console.log($("aside"));
      $('section').attr('class',"sec")
      this.navOpen = !this.navOpen;
      $(".nav_item").removeClass("active");
    },
    toggleNavItem(event) {
      if (!this.navOpen) {
        this.isOpen = true;
      }
      let self = $(event.target.parentNode);
      if (self.find("ul").hasClass("active")) {
        self.find("ul").removeClass("active");
      } else {
        self.find("ul").addClass("active");
      }
    },
    toggleNav(event) {
      this.navOpen = !this.navOpen;
      $(".dk-nav-item").removeClass("active");
    },
    listStatus(e) {
      console.log($(e.target).text());
    }
  },
  mounted(){
    // http.post("")
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.management {
  width: 100%;
  height: 100%;
  background: #fff; 
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    text-shadow: 20px 5px 5px #ccc;
    border-bottom: solid 1px #ccc;
    color: #1ab394;
    background: #fff;
    h1 {
      margin: 0;
      line-height: 70px;
    }
  }
  main {
    height: 580px;
    position: relative;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0px;
    border-bottom: 1px solid #ccc; 
    aside {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 228px;
      height: 100%;
      border-right: solid 1px #ccc;
      overflow-x: hidden;
      overflow-y: auto;
      transition: width 0.5s;
      .nav {
        display: flex;
        flex-direction: column;
        li {
          div {
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ccc;
            align-items: center;
            a {
              display: flex;
              justify-content: center;
              align-items: center;
              color: #1ab394;
              text-decoration: none;
              span {
                width: 80px;
                display: flex;
                align-items: center;
                border: 0;
                margin-left: 10px;
                font-size: 16px;
              }
            }
            svg {
              color: #1ab394;
            }
          }

          ul:nth-of-type(1) {
            border-bottom: solid 1px #ccc;

            li {
              line-height: 30px;
              font-size: 14px;
              a {
                text-decoration: none;
                color: #333;
              }
              a.router-link-exact-active{
                color: #1ab394;
              }
            }
          }

          .nav_item {
            padding-left: 52px;
            max-height: 0px;
            overflow: hidden;
            transition: max-height 0.3s;
          }
          .active {
            max-height: 200px;
            transition: max-height 0.3s;
          }
        }
      }

      span {
        display: block;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ccc;
        a {
          float: right;
          width: 30px;
          height: 30px;
          text-align: center;
          margin-top: 5px;
          margin-right: 10px;
          background: #1ab394;
          border-radius: 5px;
          svg {
            color: #fff;
            width: 20px;
            height: 20px;
            margin-top: 5px;
          }
        }
      }
    }
    .toggle {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 50px;
      border-right: solid 1px #ccc;
      overflow-x: hidden;
      overflow-y: auto;
    }
    section {
      padding-left: 20px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 229px;
      right: 0;
      overflow: auto;
      height: 100%;
       transition: all 0.5s;
    }
    section.sec{
      left:50px;
      transition: all 0.5s;

    }
  }
}
</style>
