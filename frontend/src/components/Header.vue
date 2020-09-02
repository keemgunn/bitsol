<template>
<div class="header" :class="{'header-expand':mode==='admin'}">
  <div id="light-cover"></div>
  <div class="content"
  :class="{'admin':mode==='admin'}">

    <User/>

    <AdminBtn v-if="AUTH.accessLevel > 1" />

    <transition name="appear"><AdminMenu 
    v-if="mode === 'admin'" />
    </transition>

    <transition name="appear"><SearchBox 
    v-if="mode === 'search'" />
    </transition>

  </div>
</div>
</template>



<script>
import User from '@/components/header/User';
import SearchBox from '@/components/header/SearchBox';
import AdminBtn from '@/components/header/AdminBtn';
import AdminMenu from '@/components/header/AdminMenu';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: "Header",
  components: {
    User, AdminBtn, AdminMenu, SearchBox, 
  },
  computed: {
    ...mapState(['mode', 'auth', 'test', 'authTest']),
    ...mapGetters(['AUTH'])
  },
  methods: {
    ...mapMutations(['DB_INFO'])
  },
  created() { //_____________________________
    if(this.AUTH.id === null){
      this.$store.dispatch('RECOVER');
      console.log('### configuration recovered ... @Header');
      this.DB_INFO();
    }else{
      this.DB_INFO();  
    }
  },
}
</script>



<style lang="scss" scoped> .header {
  position: absolute; top: 0; left: 0;
  width: 100vw;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none; -webkit-user-select: none;
  transition: 300ms;
}.header-expand {
  transition: 300ms;
  height: 160px;
}

.content {
  position: relative; top: 0; left: 0;
  z-index: 10;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  transition: 200ms;
  // background-color: rgba(219, 126, 13, 0.24);
}.admin {
  transition: 300ms;
  width: 710px;
}

#light-cover { 
  position: absolute; top: 0; left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: var(--i94);
}


// ================== ANIMATION =================

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}



.admin-menu-enter {
  opacity: 0;
}
.admin-menu-enter-to {
  opacity: 1;
}
.admin-menu-enter-active{
  transition: all 300ms;
  transition-delay: 300ms;
}
.admin-menu-leave {
  opacity: 1;
}
.admin-menu-leave-to {
  opacity: 0;
}
.admin-menu-leave-active {
  transition: all 280ms;
}

</style>