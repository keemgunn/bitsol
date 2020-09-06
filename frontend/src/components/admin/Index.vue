<template>
<div id="admin-index">

  <div class="title">DB 정보</div>
    <div class="content">
      <div class="prop">현재DB:</div>
      <div class="data">{{dbinfo.schema}}</div>
    </div>
    <div class="content">
      <div class="prop">DB 버전:</div>
      <div class="data">{{dbinfo.version}}</div>
    </div>
    <div class="content">
      <div class="prop">마지막 업데이트:</div>
      <div class="data">{{dbinfo.date}}</div>
    </div>
    <div class="content">
      <div class="prop">호실 점유율:</div>
      <div class="data">{{dbinfo.occupation}}</div>
      <div class="des">/ {{dbinfo.roomCount}}석</div>
    </div>
    <div class="content">
      <div class="prop">등록 학생:</div>
      <div class="data">{{dbinfo['serial-list']['length']}}</div>
      <div class="des">명</div>
    </div>

  <div class="title">냉장고 보관팩</div>
    <div class="content">
      <div class="prop">보관팩 기간:</div>
      <div class="data">{{dbinfo.deadline}}</div>
      <div class="des">까지</div>
    </div>
    <div class="content">
      <div class="prop">지급 시작일:</div>
      <div class="data">{{dbinfo.deadlineStart}}</div>
      <div class="des">({{refgMonth}}월분)</div>
    </div>
    <div class="content">
      <div class="prop">마지막 지급:</div>
      <div class="data">{{dbinfo.refgDate}}</div>
    </div>
    <div class="content">
      <div class="prop">지급된 팩:</div>
      <div class="data">{{dbinfo.refgCommit}}</div>
      <div class="des">개</div>
    </div>

  <div class="title">사용자 정보</div>
    <div class="content">
      <div class="prop">사용자:</div>
      <div class="data">{{USERS.length}}</div>
      <div class="des">명</div>
    </div>

  <div class="title">소프트웨어 정보</div>
    <div class="content">
      <div class="prop">version:</div>
      <div class="data">{{versioninfo.version}}</div>
    </div>
    <div class="content">
      <div class="prop">build:</div>
      <div class="data">{{versioninfo.build}}</div>
    </div>
    <div class="content">
      <div class="prop">updated:</div>
      <div class="data">{{versioninfo.date}}</div>
    </div>
    <div class="content">
      <div class="prop">developer:</div>
      <div class="data">{{versioninfo.developer}}</div>
      <a class="des" href="mailto:gunnkeem@icloud.com">({{versioninfo.contact}})</a>
    </div>

</div>
</template>



<script>
import { mapState } from 'vuex';

export default {
  name: "Index",
  computed: {
    ...mapState(['dbinfo', 'userinfo', 'versioninfo']),
    USERS: function(){
      return Object.keys(this.userinfo)
    },
    refgMonth: function(){
      return (this.dbinfo.refgTerm).slice(3, this.dbinfo.refgTerm.length)
    }
  }
}
</script>


<style lang="scss" scoped> 
#admin-index{
  display: block;
  position: absolute; top: 0; left: 0;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  font-family: 'Nanum Square';
  letter-spacing: 0;
  // background-color: gainsboro;
}

.title {
  font-weight: 800;
  font-size: 18px;
  margin-top: 35px;
  margin-bottom: 12px;
  text-align: center;
  // background-color: azure;
}

.content {
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
}.prop {
  display: inline-block;
  font-weight: 700;
}.data {
  display: inline-block;
  margin-left: 4px;
  font-weight: 500;
}.des {
  display: inline-block;
  position: relative; bottom: 1px;
  margin-left: 2px;
  font-size: 13px;
}
a:link{
  color: var(--i45)
}a:visited{
  color: var(--i45)
}a:active{
  color: var(--accent03)
}a:hover{
  color: var(--accent02)
}


</style>