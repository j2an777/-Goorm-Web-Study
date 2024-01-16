// User 기본 정보
class User {
    constructor(login, avatar_url, company, html_url, location, created_at, public_repos, public_gists, followers, following) {
        this.login = login;
        this.avatar_url = avatar_url;
        this.company = company;
        this.html_url = html_url;
        this.location = location;
        this.created_at = created_at;
        this.public_repos = public_repos;
        this.public_gists = public_gists;
        this.followers = followers;
        this.following = following;
    }

    updateProfile() {
        // profile img 업데이트
        const pfimg = document.createElement('img');
        pfimg.src = this.avatar_url;
        pfimg.classList.add('profileImg');

        const pfImgContainer = document.querySelector('.pfImg');
        pfImgContainer.innerHTML = '';
        pfImgContainer.appendChild(pfimg);

        // profile 카테고리 정보 업데이트
        const ctInfo = document.querySelectorAll('.categories p');

        ctInfo[0].textContent = 'Public Repos: ' + this.public_repos;
        ctInfo[1].textContent = 'Public Gists: ' + this.public_gists;
        ctInfo[2].textContent = 'Followers: ' + this.followers;
        ctInfo[3].textContent = 'Following: ' + this.following;

        // profile 기본 정보 업데이트
        const info = document.querySelectorAll('.info p');
        info[0].textContent = 'Company: ' + this.company;
        info[1].textContent = 'Website/Blog: ' + this.html_url;
        info[2].textContent = 'Location: ' + this.location;
        info[3].textContent = 'Member Since: ' + this.created_at;

        // profile url 정보 업데이트
        const urlInfo = document.querySelector('.viewPf a');
        urlInfo.href = this.html_url;

        // 잔디 심기
        const jandiImg = document.createElement('img');
        jandiImg.src = `https://ghchart.rshah.org/${this.login}`;

        const jandiBox = document.createElement('div');
        jandiBox.classList.add('jandiBox');
        jandiBox.appendChild(jandiImg);

        const jandiBoxContainer = document.querySelector('.pfright2');
        jandiBoxContainer.innerHTML = '';
        jandiBoxContainer.appendChild(jandiBox);
    }
}

// User 레포지 관련 정보
class userRepos {
    constructor(name, stargazers_count, watchers, forks, html_url) {
        this.name = name;
        this.stargazers_count = stargazers_count;
        this.watchers = watchers;
        this.forks = forks;
        this.html_url = html_url;
        console.log(this.name, this.stargazers_count, this.watchers, this.forks);
    }

    updateRepos() {
        // reposInfo 요소 생성
        const reposInfo = document.createElement('a');
        reposInfo.classList.add('reposInfo');
        reposInfo.href = this.html_url;

        const reposList = document.createElement('div');
        reposList.classList.add('reposList');

        const reposLeft = document.createElement('div');
        reposLeft.classList.add('reposLeft');

        const reposRight = document.createElement('div');
        reposRight.classList.add('reposRight');

        // repos 제목 정보 업데이트
        const repoTitle = document.createElement('p');
        repoTitle.textContent = this.name;
        reposLeft.appendChild(repoTitle);

        // repos 부가 정보 업데이트
        const repoStar = document.createElement('p');
        repoStar.textContent = 'Stars: ' + this.stargazers_count;
        const repoWatch = document.createElement('p');
        repoWatch.textContent = 'Watchers: ' + this.watchers;
        const repoFork = document.createElement('p');
        repoFork.textContent = 'Forks: ' + this.forks;

        reposRight.appendChild(repoStar);
        reposRight.appendChild(repoWatch);
        reposRight.appendChild(repoFork);

        // reposList에 reposLeft와 reposRight 추가
        reposList.appendChild(reposLeft);
        reposList.appendChild(reposRight);
        reposInfo.appendChild(reposList);

        // reposContents 내부에 reposInfo 추가
        const reposContents = document.querySelector('.reposContents');
        reposContents.appendChild(reposInfo);
    }
}

async function updateUserData(username) {
    try {
        const url = `https://api.github.com/users/${username}`;
        const data = await fetch(url).then(response => response.json());
        return data;

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

async function updateReposData(username) {
    try {
        const url = `https://api.github.com/users/${username}/repos`;
        const redata = await fetch(url).then(response => response.json());
        console.log(redata);
        return redata;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
// 로컬 스토리지에 사용자 데이터 저장
function saveUserDataToLocalStorage(userdata, reposdata) {
    const data = {
        userdata: userdata,
        reposdata: reposdata
    };
    localStorage.setItem('githubData', JSON.stringify(data));
}

// 로컬 스토리지에서 사용자 데이터 로드
function loadUserDataFromLocalStorage() {
    const data = localStorage.getItem('githubData');
    return data ? JSON.parse(data) : null;
}

// 사용자 데이터와 저장소 데이터 업데이트
async function updateDataAndDisplay(username) {
    const userdata = await updateUserData(username);
    const reposdata = await updateReposData(username);

    if (userdata && reposdata) {
        saveUserDataToLocalStorage(userdata, reposdata); // 데이터 저장
        displayUserData(userdata, reposdata); // 화면에 표시
    } else {
        alert('User not found');
    }
}

// 화면에 사용자 데이터 표시
function displayUserData(userdata, reposdata) {
    const user = new User(userdata.login, userdata.avatar_url, userdata.company, userdata.html_url, userdata.location, userdata.created_at, userdata.public_repos, userdata.public_gists, userdata.followers, userdata.following);
    user.updateProfile();

    const reposContents = document.querySelector('.reposContents');
    reposContents.innerHTML = '';

    reposdata.forEach(repo => {
        const repoInfo = new userRepos(repo.name, repo.stargazers_count, repo.watchers, repo.forks, repo.html_url);
        repoInfo.updateRepos();
    });
}

const searchInput = document.getElementById('scName');
// 검색 입력 필드 이벤트 리스너
searchInput.addEventListener('keyup', async (e) => {
    if (e.key === 'Enter') {
        const username = e.target.value;
        await updateDataAndDisplay(username);
    }
});

// 페이지 로드 시 이전 검색 데이터 표시
document.addEventListener('DOMContentLoaded', () => {
    const data = loadUserDataFromLocalStorage();
    if (data) {
        displayUserData(data.userdata, data.reposdata);
    }
});


