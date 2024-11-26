import{_ as s,c as n,ai as e,o as t}from"./chunks/framework.CTvXDpzq.js";const u=JSON.parse('{"title":"连续的直线运动","description":"","frontmatter":{"title":"连续的直线运动"},"headers":[],"relativePath":"zhHans/xarm_python_sdk/continuous_inear_motion.md","filePath":"zhHans/xarm_python_sdk/continuous_inear_motion.md","lastUpdated":1732269888000}'),p={name:"zhHans/xarm_python_sdk/continuous_inear_motion.md"};function i(l,a,r,o,d,c){return t(),n("div",null,a[0]||(a[0]=[e(`<h3 id="等待" tabindex="-1">等待 <a class="header-anchor" href="#等待" aria-label="Permalink to &quot;等待&quot;">​</a></h3><p>直线运动set_potision()接口中，通过wait参数设置等待与否。</p><ul><li>wait=True, 表示当前指令执行完成后，再给机械臂发送下一条指令。</li><li>wait=False, 表示当前指令发送后，不管机械臂是执行，立即发送下一条指令。 例如，让机械臂以200mm/s 的速度运动到下列A,B,C,D四个点，指令间不等待。</li></ul><p>A点 [300,100,150,180,0,0] B点 [300,-100,150,180,0,0] C点[400,-100,150,180,0,0] D点[400,100,150,180,0,0]</p><p>完整的代码如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from xarm.wrapper import XArmAPI  </span></span>
<span class="line"><span>arm=XArmAPI(&#39;192.168.1.47&#39;)  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>arm.motion_enable(enable=True)  </span></span>
<span class="line"><span>arm.set_mode(0)  </span></span>
<span class="line"><span>arm.set_state(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>arm.set_position(300,100,150,180,0,0,speed=200,wait=False)  </span></span>
<span class="line"><span>arm.set_position(300,-100,150,180,0,0,speed=200,wait=False)  </span></span>
<span class="line"><span>arm.set_position(400,-100,150,180,0,0,speed=200,wait=False)  </span></span>
<span class="line"><span>arm.set_position(400,100,150,180,0,0,speed=200,wait=False)</span></span></code></pre></div><h3 id="交融半径" tabindex="-1">交融半径 <a class="header-anchor" href="#交融半径" aria-label="Permalink to &quot;交融半径&quot;">​</a></h3><p>交融半径，类似于汽车转弯的转弯半径。设置大于0的交融半径，机械臂轨迹转弯过程将变得顺滑。 直线运动set_potision()接口中，交融半径通过radius参数传入。 radius参数只有在wait=False的情况下才有效，且radius的设置会影响轨迹的连续性。</p><p>下表显示了轨迹连续性与wait、radius参数之间的关系</p><table tabindex="0"><thead><tr><th>参数</th><th>radius&lt;0</th><th>radius≥0</th></tr></thead><tbody><tr><td>wait=True</td><td>不连续</td><td>不连续</td></tr><tr><td>wait=False</td><td>不连续</td><td>连续</td></tr></tbody></table><p>所以，当且仅当wait=Flase且randius≥0时，才能够实现连续的直线运动。</p><h3 id="连续的直线运动" tabindex="-1">连续的直线运动 <a class="header-anchor" href="#连续的直线运动" aria-label="Permalink to &quot;连续的直线运动&quot;">​</a></h3><p>连续直线运动需要满足的条件</p><ul><li>至少有2条笛卡尔指令</li><li>wait=False</li><li>radius≥0</li></ul><p>下述是一个连续直线运动的例子，交融半径为5 mm.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from xarm.wrapper import XArmAPI  </span></span>
<span class="line"><span>arm=XArmAPI(&#39;192.168.1.47&#39;)  </span></span>
<span class="line"><span>arm.motion_enable(enable=True)  </span></span>
<span class="line"><span>arm.set_mode(0)  </span></span>
<span class="line"><span>arm.set_state(0)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>arm.set_position(300,100,150,180,0,0,speed=200,wait=False,radius=5)  </span></span>
<span class="line"><span>arm.set_position(300,-100,150,180,0,0,speed=200,wait=False,radius=5)  </span></span>
<span class="line"><span>arm.set_position(400,-100,150,180,0,0,speed=200,wait=False,radius=5)  </span></span>
<span class="line"><span>arm.set_position(400,100,150,180,0,0,speed=200,wait=False,radius=5)</span></span></code></pre></div>`,16)]))}const h=s(p,[["render",i]]);export{u as __pageData,h as default};
