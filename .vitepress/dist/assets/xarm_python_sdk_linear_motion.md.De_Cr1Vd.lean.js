import{_ as e,c as s,a3 as n,o as t}from"./chunks/framework.DtMx7FFi.js";const h=JSON.parse('{"title":"Linear Motion","description":"","frontmatter":{"title":"Linear Motion"},"headers":[],"relativePath":"xarm_python_sdk/linear_motion.md","filePath":"en/xarm_python_sdk/linear_motion.md","lastUpdated":null}'),i={name:"xarm_python_sdk/linear_motion.md"};function o(p,a,l,r,d,m){return t(),s("div",null,a[0]||(a[0]=[n(`<h2 id="_1-linear-motion" tabindex="-1">1. Linear Motion <a class="header-anchor" href="#_1-linear-motion" aria-label="Permalink to &quot;1. Linear Motion&quot;">​</a></h2><h3 id="initialization" tabindex="-1">Initialization <a class="header-anchor" href="#initialization" aria-label="Permalink to &quot;Initialization&quot;">​</a></h3><p>Assume the robotic arm controller&#39;s IP address is 192.168.1.47, initialize the robotic arm.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from xarm.wrapper import XArmAPI  </span></span>
<span class="line"><span>arm=XArmAPI(&#39;192.168.1.47&#39;)</span></span></code></pre></div><h3 id="enable" tabindex="-1">Enable <a class="header-anchor" href="#enable" aria-label="Permalink to &quot;Enable&quot;">​</a></h3><p>If the robotic arm is not enabled, it needs to be enabled. Once enabled, there is no need to enable it again.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.motion_enable(enable=True)</span></span></code></pre></div><h3 id="set-mode-and-state" tabindex="-1">Set Mode and State <a class="header-anchor" href="#set-mode-and-state" aria-label="Permalink to &quot;Set Mode and State&quot;">​</a></h3><p>After enabling, you need to set the mode and state for the robotic arm to move.<br> The robotic arm has multiple modes; the commonly used linear motion and joint motion are both position commands, i.e., mode 0.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_mode(0)</span></span></code></pre></div><p>The robotic arm can be set to various modes. Mode 0 is for motion, mode 3 is for pausing the motion, and mode 4 is for stopping the motion.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_state(0)</span></span></code></pre></div><h3 id="send-position-command" tabindex="-1">Send Position Command <a class="header-anchor" href="#send-position-command" aria-label="Permalink to &quot;Send Position Command&quot;">​</a></h3><p>In the xArm-Python-SDK, the Cartesian position is defined as x, y, z, roll, pitch, yaw.<br> The unit for distance is millimeters (mm), and the default angle representation is degrees (°).</p><p>As an example of linear motion in Cartesian space, let the robotic arm move to point A [300,0,150,180,0,0] first, and then to point B [400,0,150,180,0,0].</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_position(300,0,150,180,0,0)  </span></span>
<span class="line"><span>arm.set_position(400,0,150,180,0,0)</span></span></code></pre></div><h3 id="speed" tabindex="-1">Speed <a class="header-anchor" href="#speed" aria-label="Permalink to &quot;Speed&quot;">​</a></h3><p>In the <code>set_position()</code> interface for linear motion, the speed is passed with the <code>speed</code> parameter, and the unit is mm/s.<br> For example, let the robotic arm move to point A [300,100,150,180,0,0] at 200 mm/s.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_position(300,100,150,180,0,0, speed=200)</span></span></code></pre></div><h3 id="complete-example" tabindex="-1">Complete Example <a class="header-anchor" href="#complete-example" aria-label="Permalink to &quot;Complete Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from xarm.wrapper import XArmAPI  </span></span>
<span class="line"><span>arm = XArmAPI(&#39;192.168.1.47&#39;)  </span></span>
<span class="line"><span>arm.motion_enable(enable=True)  </span></span>
<span class="line"><span>arm.set_mode(0)  </span></span>
<span class="line"><span>arm.set_state(0)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>arm.set_position(300,0,150,180,0,0, speed=200)  </span></span>
<span class="line"><span>arm.set_position(400,0,150,180,0,0, speed=200)</span></span></code></pre></div>`,21)]))}const b=e(i,[["render",o]]);export{h as __pageData,b as default};
