<template>
<div id="header">
  <div id="light-cover"></div>
  <div id="content">

    <User/>

    <AdminBtn v-if="auth.accessLevel > 1" />

    <transition name="appear">
    <SearchBox v-if="mode === 'search'" />
    </transition>

  </div>
</div>
</template>



<script>
import User from '@/components/header/User';
import AdminBtn from '@/components/header/AdminBtn';
import SearchBox from '@/components/header/SearchBox';
import { mapState, mapMutations } from 'vuex';

export default {
  name: "Header",
  components: {
    User, AdminBtn, SearchBox
  },
  computed: {
    ...mapState(['mode', 'auth'])
  },
  methods: {
    ...mapMutations(['DB_INFO'])
  },
  created() { //_____________________________
    if(this.$store.state.auth.id === null){
      this.$store.dispatch('RECOVER');
      console.log('### configuration recovered ... @Header');
    }
    this.DB_INFO();
  },
}
</script>



<style lang="scss" scoped> #header {
  position: absolute; top: 0; left: 0;
  width: 100vw;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none; -webkit-user-select: none;
}

#content {
  position: relative; top: 0; left: 0;
  z-index: 10;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  // background-color: rgba(219, 126, 13, 0.24);
}

#light-cover { 
  position: absolute; top: 0; left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: var(--i94);
}


// ================== ANIMATION =================

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

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