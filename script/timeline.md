# 时间轴（edge · zh-CN-YunxiNeural +0%，共 415 帧 = 13.8s，24 词，语速 2.62 词/s）

| 句 | 章 | 帧 from–to | 时长 | 末块 | 段末 | 文本（| 为字幕切分） |
|---|---|---|---|---|---|---|
| S01 | 0 | 41–315 | 9.2s | 59 | ¶ | The Sun.｜A massive ball of plasma｜one point four million kilometers wide,｜burning at fifteen million degrees,｜that powers all life on Earth. |

## 章节起始帧

段末 ¶ = narration.txt 里空行/章界前的那句（一个镜头讲完，画面在这里停 1–1.5 s 再切；段内句只隔 10 帧，不停顿）。
末块 = 末尾字幕块的帧数（段末句 ⚠ <45：末拍元素 22 帧入场 + 8 帧离场后停不满 30 帧）。补法：该句后加 `## gap 15–30` 重跑（缓存命中），或分镜时把末拍元素前挂到上一块。
