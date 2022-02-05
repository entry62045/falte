console.log('엔트리 창에 가서 유저 id를 입력하세요.');
var user = prompt("마이페이지 주소에 나와있는 유저 id를 입력하세요");
var a = (await (await fetch('https://playentry.org/graphql', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
query: `
query SELECT_USER_PROJECTS(
$user: String!
$query: String
$categoryCode: String
$groupId: ID
$pageParam: PageParam
$isOpen: Boolean
$except: [ID]
$searchAfter: JSON
$searchType: String
) {
userProjectList(
user: $user
query: $query
categoryCode: $categoryCode
groupId: $groupId
pageParam: $pageParam
isOpen: $isOpen
except: $except
searchAfter: $searchAfter
searchType: $searchType
) {
total
list {
id
name
user {
id
username
nickname
profileImage {
id
filename
imageType
}
}
thumb
isopen
isPracticalCourse
category
categoryCode
created
updated
special
isForLecture
isForStudy
isForSubmit
hashId
complexity
staffPicked
ranked
visit
likeCnt
comment
}
searchAfter
}
}
`,
variables: {searchType: 'scroll', user: user, term: 'all', pageParam: {display: 12, sort: 'created'}}
})
})).json()).data.userProjectList.total

for (var i=0; i<a; i++) {
var id = (await (await fetch('https://playentry.org/graphql', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
query: `
query SELECT_USER_PROJECTS(
$user: String!
$query: String
$categoryCode: String
$groupId: ID
$pageParam: PageParam
$isOpen: Boolean
$except: [ID]
$searchAfter: JSON
$searchType: String
) {
userProjectList(
user: $user
query: $query
categoryCode: $categoryCode
groupId: $groupId
pageParam: $pageParam
isOpen: $isOpen
except: $except
searchAfter: $searchAfter
searchType: $searchType
) {
total
list {
id
name
user {
id
username
nickname
profileImage {
id
filename
imageType
}
}
thumb
isopen
isPracticalCourse
category
categoryCode
created
updated
special
isForLecture
isForStudy
isForSubmit
hashId
complexity
staffPicked
ranked
visit
likeCnt
comment
}
searchAfter
}
}
`,
variables: {searchType: 'scroll', user: user, term: 'all', pageParam: {display: 12, sort: 'created'}}
})
})).json()).data.userProjectList.list[0].id


await fetch('https://playentry.org/graphql', {
method: 'POST',
headers: {
'content-type': 'application/json'
},
body: JSON.stringify({
query:`
mutation DELETE_PROJECT($id: ID!) {
deleteProject(id: $id) {
status
result
}
}`,
variables: {id: id}
})
});
}
alert('복구가 완료되었습니다.');