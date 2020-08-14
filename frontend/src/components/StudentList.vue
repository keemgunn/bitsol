<template>
<div id="stdtlist">

  <div id="deadline"
  v-if="this.$store.state.modal.scopeTab === 'refg'">
    <div id="han">보관팩 기간: </div>
    <div id="date">{{test}}</div>
  </div>

  <div id="no-result"
  v-if="searchArr.length === 0">
    <div id="no-result"
    v-if="this.keyword == ''">
      호실 또는 이름으로 검색 ...
    </div>
    <div id="no-result"
    v-if="this.keyword !== ''">
      검색 결과가 없습니다 ...
    </div>
  </div>

  <div class="scopeSelection"
  v-if="this.$store.state.modal.scopeTab === 'refg'">
    <div class="result"
    :key="record.student_id"
    v-for="record in searchArr">
      <ListRefg 
        :record="record" 
      />
    </div>
  </div>

  <div class="scopeSelection"
  v-if="this.$store.state.modal.scopeTab === 'info'">
    scopeTab === 'info'
  </div>








</div>
</template>

<script>
import ListRefg from '@/components/ListRefg'

export default {
  name: 'StudentList',
  components: {
    ListRefg
  },
  data() { return {
    test: "8/24"
  }},
  computed: {
    noResult : function() {
      let msg
      if(this.keyword === ''){
        msg = "호실 또는 이름으로 검색 ..."
      }else {
        msg = "검색 결과가 없습니다 ..."
      }
      return msg
    }
  },
  props: [
    "keyword",
    "searchArr", // from /db/search
    "dbinfo"
  ],
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss" scoped> #stdtlist 
{
  display: block;
  margin-top: 12px;
  width: 100%;
  height: calc(100% - 156px);

  background-color: burlywood;
}

/* --------------- REFG HEADER-------------- */
#deadline { 
  display: block;
  height: 35px;
  line-height: 35px;
  background-color: aqua;
}
#han {
  display: inline-block;
  margin-top: 0px;
  position: relative;
  bottom: 2px;

  font-family: 'Nanum Square';
  font-weight: 800;
  font-size: 21px;
  letter-spacing: 0.31px;
}
#date {
  display: inline-block;
  margin-top: 0px;
  position: relative;
  left: 4px;

  font-family: 'Barlow';
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 1.44px;
}


/* --------------- SEARCH RESULTS -------------- */

#no-result {
  padding-top: 20px;
  font-family: 'Nanum Square';
  font-weight: 200;
  font-size: 35px;
  color: var(--i45);
  font-style: italic;
  letter-spacing: 0.31px;

  opacity: 0;
  animation: fade-in 300ms;
  animation-timing-function: ease-in-out;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.result {
  display: block;
  width: 100%;
  height: 120px;
  

  background-color: darkblue;
}



</style>
