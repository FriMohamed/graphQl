const loginHtml = `
    <div class="login-container">
        <div class="login-box">
          <img class="logo" src="./assets/logo.png" alt="zone 01 oujda logo">
          <form action="#" method="POST">
            <div class="input-group">
              <input type="text" id="identifier" placeholder="Username or Email" autocomplete="off" required>
              <i class="fas fa-user"></i>
            </div>
            <div class="input-group password-group">
              <input type="password" id="password" placeholder="Password" required>
              <i class="fas fa-lock"></i>
              <i class="fas fa-eye" id="toggle-password"></i>
            </div>
            <div class="login-error hidden">
              <p>Invalid Credentials</p>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
    </div>
`;

const profileHtml = `
  <div class="profile" id="profile">
    <div class="profile-info">
      <div class="user-info">
        <div id="user-name">
            <span></span>
            <div id="logout" class="hidden">
                <span>LogOut</span>
            </div>
        </div>
        <div class="info">
          <div id="full-name"></div>
          <div id="campus"></div>
        </div>
      </div>
      <span id="br"></span>
      <div class="user-progress">
        <div id="ratio">
          <span></span>
          <span class="des">ratio</span>
        </div>
        <div id="level">
          <span></span>
          <span class="des">level</span>
        </div>
        <div id="xp">
          <span></span>
          <span class="des"></span>
        </div>
      </div>
    </div>

    <div class="module-graphs">
      <div class="graph">
        <svg id="module-xpByTime">
        </svg>
      </div>
      <div class="graph" id="skills">
        <svg id="module-skills">
        </svg>
        <div id="prevent">Prev</div>
        <div id="next">Next</div>
      </div>
    </div>
    <div id="piscines">
      <select id="piscine-select">
        <option value="piscine-go" selected>Piscine-Go</option>
        <option value="module/piscine-js">Piscine-Js</option>
      </select>
      <div id="p-level">Level: <span></span></div>
      <div id="p-xp">XP:  <span></span></div>
      <div class="p-graph2">
        <svg></svg>
      </div>
    </div>    
  </div>
`;
export { loginHtml, profileHtml }