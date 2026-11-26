# 代表工作链接与单位核对记录

核对日期：2026-11-26。范围：网页 Spectrum 的 53 项代表工作。

来源：`/Users/hongboqiu/Downloads/MUSE_Arxiv/main.bib`、同目录 `main.tex`、`figs/theoretical_framework/spectrum_representative_work.pdf`。

链接来源：11 项直接复制 BibTeX URL，27 项按原文 arXiv 编号生成链接，15 项按标题、作者、出版信息补查。

## 本轮修正与差异

- AnnaAgent：原图误用美国 Northeastern University 校徽。论文作者单位是中国东北大学；网页已替换为中国东北大学蓝白“白山黑水”SVG 校徽，并明确标注 China。素材来自 SVGLOGO，已对照学校官网标识核验；保留矢量路径，移除素材投影并调整留白。
- AgentHPO：单位细化为 HKUST (Guangzhou) · Tsinghua。
- Generative Agents、MemPrompt：改为 manuscript 对应的 UIST DOI、EMNLP 正式发表页面。
- MYCIN：当前仍链接同一本书的 1976 原版，而稿件引用 2012 再版；这是已知版本差异，已在悬浮提示中注明，不能声称引用版本完全一致。
- ALICE：2007 是出版社记录的首次上线日期，出版社生成的书籍引用日期为 2009。
- HarnessBank：arXiv 编号相同，在线新版标题发生变化。SAD 也存在标题和作者名单的修订差异。
- MemoryOS：manuscript 页码为 25972–25981，官方 PDF 为 25961–25970；工作标题及四位作者对应一致。未修改用户的 manuscript。

## 核对口径与限制

单位以论文署名页、作者机构信息或项目团队官方页面为依据；卡片仅展示部分署名机构/团队，不能解读为全部单位或独家归属。机构 Logo 的身份与单位文本分别核对。44 个保留图标来自 manuscript 原图；AnnaAgent 已另行使用经官网标识比对的 SVG 校徽；AgentEvolver 的 Qwen 产品标识也已移除，以免混同 Tongyi Lab 与 Qwen 团队。AgentEvolver 与 7 个历史系统使用通用图标。

8 个 OpenReview 链接与 BibTeX 完全一致，但网站返回浏览器验证，未读取到对应 forum 正文；已使用同题、同作者的官方/预印本论文交叉核对工作身份。这些条目不能标记为“落地页已逐项验证”。AAAI 也有访问验证限制。

年份一般沿用 manuscript 的引用年份，不一定是系统提出年份，也不一定是当前修订年份。版本差异不等于链接指向另一项工作。

## 逐项清单

| 工作 | 引用键 / 来源 | 当前论文链接 | 展示单位 | 单位证据 | 说明 |
| --- | --- | --- | --- | --- | --- |
| ELIZA | `weizenbaum1983eliza` / 按引用补查 | [论文](https://doi.org/10.1145/357980.357991) | MIT | [署名/机构来源](https://doi.org/10.1145/357980.357991) | 1983 is the cited CACM reprint date, not the original 1966 system/paper date. |
| PARRY | `colby1971artificial` / 按引用补查 | [论文](https://doi.org/10.1016/0004-3702(71)90002-6) | Stanford | [署名/机构来源](https://web.stanford.edu/class/cs124/colby_71.pdf) | 标题/作者身份及所展示单位对应。 |
| SHRDLU | `winograd1972understanding` / 按引用补查 | [论文](https://doi.org/10.1016/0010-0285(72)90002-3) | MIT | [署名/机构来源](https://teaching.bb-ai.net/Student-Projects/Winograd-Challenge-Papers/Winograd-1972-Understanding-Natural-Language.pdf) | 标题/作者身份及所展示单位对应。 |
| MYCIN | `shortliffe2012computer` / 按引用补查 | [论文](https://www.sciencedirect.com/book/monograph/9780444001795/computer-based-medical-consultations-mycin) | Stanford | [署名/机构来源](https://people.dbmi.columbia.edu/~ehs7001/Shortliffe-1976/MYCIN%20thesis%20Book.htm) | Same book, different edition: manuscript cites Elsevier 2012; card links to the 1976 original. Explicitly disclosed in the card tooltip; exact edition parity remains unresolved. |
| ALICE | `wallace2007anatomy` / 按引用补查 | [论文](https://link.springer.com/chapter/10.1007/978-1-4020-6710-5_13) | A.L.I.C.E. Foundation | [署名/机构来源](https://link.springer.com/chapter/10.1007/978-1-4020-6710-5_13) | Publisher records first-online date 23 November 2007 (matching manuscript), but its generated book citation uses 2009. |
| XCON | `barker1989expert` / 按引用补查 | [论文](https://doi.org/10.1145/62065.62067) | Digital Equipment Corp. | [署名/机构来源](https://api.crossref.org/works/10.1145/62065.62067) | 标题/作者身份及所展示单位对应。 |
| INTERNIST-I | `miller1985internist` / 按引用补查 | [论文](https://link.springer.com/chapter/10.1007/978-1-4612-5108-8_8) | University of Pittsburgh | [署名/机构来源](https://www.nejm.org/doi/abs/10.1056/NEJM198208193070803) | 标题/作者身份及所展示单位对应。 |
| MemGPT | `packer2023memgpt` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2310.08560) | UC Berkeley | [署名/机构来源](https://arxiv.org/pdf/2310.08560) | 标题/作者身份及所展示单位对应。 |
| MemoryBank | `zhong2024memorybank` / 按引用补查 | [论文](https://ojs.aaai.org/index.php/AAAI/article/view/29946) | Sun Yat-sen University | [署名/机构来源](https://arxiv.org/pdf/2305.10250) | AAAI landing page is bot-protected; title, author set and affiliation cross-checked against the matching arXiv paper; conference metadata supported by publisher DOI 10.1609/AAAI.V38I17.29946. |
| Generative Agents | `park2023generative` / 按引用补查 | [论文](https://doi.org/10.1145/3586183.3606763) | Stanford · Google | [署名/机构来源](https://arxiv.org/html/2304.03442) | Changed the card from arXiv to the UIST 2023 DOI matching the manuscript. |
| MemPrompt | `madaan2022memory` / 按引用补查 | [论文](https://aclanthology.org/2022.emnlp-main.183/) | CMU · AllenAI | [署名/机构来源](https://aclanthology.org/2022.emnlp-main.183.pdf) | Changed the card from arXiv to the exact EMNLP 2022 publication cited in the manuscript. The PDF heading and Anthology metadata use different title wording for the same paper. |
| ChatDB | `hu2023chatdb` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2306.03901) | Tsinghua | [署名/机构来源](https://arxiv.org/pdf/2306.03901) | 标题/作者身份及所展示单位对应。 |
| Mem0 | `chhikara2025mem0` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2504.19413) | Mem0 | [署名/机构来源](https://arxiv.org/pdf/2504.19413) | 标题/作者身份及所展示单位对应。 |
| MemoryOS | `kang2025memory` / 按引用补查 | [论文](https://aclanthology.org/2025.emnlp-main.1318/) | BUPT · Tencent | [署名/机构来源](https://aclanthology.org/2025.emnlp-main.1318.pdf) | Manuscript pages 25972–25981 differ from the linked official PDF, 25961–25970. Title and all four authors match. The manuscript bibliography needs a page-range correction; not edited here. |
| AnnaAgent | `wang2025annaagent` / 按引用补查 | [论文](https://aclanthology.org/2025.findings-acl.1192/) | Northeastern University (China) | [署名/机构来源](https://aclanthology.org/2025.findings-acl.1192.pdf) | 已替换为中国东北大学 SVG 校徽；[素材来源](https://svglogo.top/library/school/NEU.svg)，[官网核对](https://www.neu.edu.cn/xygk/ddbs.htm)。 |
| A-Mem | `xu2025amem` / 原 URL | [论文](https://openreview.net/forum?id=FiM0M8gcct) | Rutgers | [署名/机构来源](https://arxiv.org/pdf/2502.12110) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| Evo-Memory | `wei2025evo` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2511.20857) | Google DeepMind · UIUC | [署名/机构来源](https://arxiv.org/pdf/2511.20857) | 标题/作者身份及所展示单位对应。 |
| AutoFlow | `li2024autoflow` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2407.12821) | Rutgers | [署名/机构来源](https://arxiv.org/pdf/2407.12821) | Distinct from AFLOW: li2024autoflow, Rutgers, arXiv:2407.12821. |
| Puppeteer | `dang2025multiagent` / 原 URL | [论文](https://openreview.net/forum?id=L0xZPXT3le) | Tsinghua | [署名/机构来源](https://arxiv.org/pdf/2505.19591) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| Skill-SP | `huang2026skillsp` / 原 URL | [论文](https://arxiv.org/abs/2607.22529) | Alibaba Qwen | [署名/机构来源](https://arxiv.org/pdf/2607.22529) | 标题/作者身份及所展示单位对应。 |
| MA-Evolve | `chen2025multi` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2510.23595) | UIUC | [署名/机构来源](https://arxiv.org/pdf/2510.23595) | 标题/作者身份及所展示单位对应。 |
| SPICE | `liu2025spice` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2510.24684) | Meta FAIR | [署名/机构来源](https://arxiv.org/pdf/2510.24684) | 标题/作者身份及所展示单位对应。 |
| AFLOW | `zhang2025aflow` / 原 URL | [论文](https://openreview.net/forum?id=z5uVAKwmjf) | DeepWisdom · HKUST (Guangzhou) | [署名/机构来源](https://arxiv.org/pdf/2410.10762) | Distinct from AutoFlow: zhang2025aflow, DeepWisdom / HKUST Guangzhou, ICLR 2025.；Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| SCA | `zhou2025selfchallenging` / 原 URL | [论文](https://openreview.net/forum?id=9yusqX9DpR) | UC Berkeley · Meta FAIR | [署名/机构来源](https://arxiv.org/pdf/2506.01716) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| ALMA | `xiong2026learning` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2602.07755) | UBC | [署名/机构来源](https://arxiv.org/pdf/2602.07755) | 标题/作者身份及所展示单位对应。 |
| SkillProx | `zheng2026skillprox` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2608.07449) | HKUST | [署名/机构来源](https://arxiv.org/pdf/2608.07449) | 标题/作者身份及所展示单位对应。 |
| SIA | `hebbar2026sia` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2605.27276) | Hexo Labs · Oxford | [署名/机构来源](https://arxiv.org/pdf/2605.27276) | 标题/作者身份及所展示单位对应。 |
| CoMAS | `xue2025comas` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2510.08529) | CUHK | [署名/机构来源](https://arxiv.org/pdf/2510.08529) | 标题/作者身份及所展示单位对应。 |
| SELF | `lu2023self` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2310.00533) | HKU · Huawei | [署名/机构来源](https://arxiv.org/pdf/2310.00533) | 标题/作者身份及所展示单位对应。 |
| SAD | `liu2025structured` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2505.13820) | CMU | [署名/机构来源](https://arxiv.org/pdf/2505.13820) | Same arXiv identifier and lead author; current revision adds Agents to the title and updates the author list. Card retains the manuscript title and first-submission year, with a version note. |
| ADA | `su2026learning` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2603.09065) | Harvard · Amazon | [署名/机构来源](https://arxiv.org/pdf/2603.09065) | 标题/作者身份及所展示单位对应。 |
| EvoAgent | `yuan2025evoagent` / 按引用补查 | [论文](https://aclanthology.org/2025.naacl-long.315/) | Fudan · Microsoft | [署名/机构来源](https://aclanthology.org/2025.naacl-long.315.pdf) | 标题/作者身份及所展示单位对应。 |
| Sophia | `sun2025sophia` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2512.18202) | Westlake University | [署名/机构来源](https://arxiv.org/pdf/2512.18202) | Paper contains both for Artificial Life and of Artificial Life headings. Retained manuscript/abstract-page wording of Artificial Life. |
| EvoTest | `he2025evotest` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2510.13220) | NUS · Microsoft | [署名/机构来源](https://arxiv.org/pdf/2510.13220) | 标题/作者身份及所展示单位对应。 |
| SCoRe | `kumar2025training` / 原 URL | [论文](https://openreview.net/forum?id=CjwERcAU7w) | Google DeepMind | [署名/机构来源](https://arxiv.org/pdf/2409.12917) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| ScoreFlow | `wang2025scoreflow` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2502.04306) | UChicago · Princeton · Oxford | [署名/机构来源](https://arxiv.org/pdf/2502.04306) | 标题/作者身份及所展示单位对应。 |
| COVE | `ji2026learning` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2608.01234) | USTC | [署名/机构来源](https://arxiv.org/pdf/2608.01234) | 标题/作者身份及所展示单位对应。 |
| OpenSkill | `yan2026openskill` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2606.06741) | Lehigh University | [署名/机构来源](https://arxiv.org/pdf/2606.06741) | 标题/作者身份及所展示单位对应。 |
| Agent0 | `xia2025agent0` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2511.16043) | UNC-Chapel Hill | [署名/机构来源](https://arxiv.org/pdf/2511.16043) | 标题/作者身份及所展示单位对应。 |
| Voyager | `wang2024voyager` / 原 URL | [论文](https://openreview.net/forum?id=ehfRiF0R3a) | NVIDIA | [署名/机构来源](https://arxiv.org/html/2305.16291) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| MemEvolve | `zhang2025memevolve` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2512.18746) | OPPO · LV-NUS Lab | [署名/机构来源](https://arxiv.org/pdf/2512.18746) | Paper cover identifies OPPO AI Agent Team, LV-NUS lab. HTML and PDF versions can differ; the checked PDF is v1. |
| AgentEvolver | `zhai2025agentevolver` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2511.10395) | Alibaba Tongyi Lab | [署名/机构来源](https://arxiv.org/pdf/2511.10395) | Uses zhai2025agentevolver / 2511.10395, as cited for this work in the manuscript; not zhang2026agentevolversystem. The paper identifies Tongyi Lab, Alibaba Group. The inherited Qwen product mark was removed because it does not establish a Qwen team affiliation. |
| GiGPO | `feng2025groupingroup` / 原 URL | [论文](https://openreview.net/forum?id=QXEhBMNrCW) | NTU · Skywork AI | [署名/机构来源](https://arxiv.org/pdf/2505.10978) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| SIOP | `hu2026self` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2605.04984) | CityU Hong Kong | [署名/机构来源](https://arxiv.org/pdf/2605.04984) | 标题/作者身份及所展示单位对应。 |
| AgentHPO | `liu2025agenthpo` / 按引用补查 | [论文](https://proceedings.mlr.press/v280/liu25c.html) | HKUST (Guangzhou) · Tsinghua | [署名/机构来源](https://raw.githubusercontent.com/mlresearch/v280/main/assets/liu25c/liu25c.pdf) | Affiliation is Hong Kong University of Science and Technology (Guangzhou), not an unspecified HKUST campus. Label corrected. The original figure uses the HKUST symbol. |
| Creator | `qian2023creator` / 按引用补查 | [论文](https://aclanthology.org/2023.findings-emnlp.462/) | Tsinghua · UIUC | [署名/机构来源](https://aclanthology.org/2023.findings-emnlp.462.pdf) | 标题/作者身份及所展示单位对应。 |
| ToolGen | `wang2025toolgen` / 原 URL | [论文](https://openreview.net/forum?id=XLMAMmowdY) | LibrAI · MBZUAI | [署名/机构来源](https://arxiv.org/pdf/2410.03439) | Exact OpenReview URL copied from main.bib. Landing page returned a browser-verification challenge; forum content was not independently read. Matching official/preprint paper was checked separately. |
| SkillMentor | `bao2026skillmentor` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2607.27360) | PolyU · Tencent | [署名/机构来源](https://arxiv.org/pdf/2607.27360) | 标题/作者身份及所展示单位对应。 |
| HarnessBank | `luo2026self` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2607.13683) | EverMind AI · Shanda | [署名/机构来源](https://arxiv.org/pdf/2607.13683) | Same arXiv identifier and author set; v2 is titled HarnessBank: Semantic Gene-Bank Search with Gated Verification for Agent-Harness Self-Evolution, whereas the manuscript cites Self-Evolving Agent Harnesses via Gated Semantic Quality-Diversity. |
| MetaSkill-Evolve | `wang2026metaskill` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2607.05297) | LMU Munich | [署名/机构来源](https://arxiv.org/pdf/2607.05297) | 标题/作者身份及所展示单位对应。 |
| HyperAgents | `zhang2026hyperagents` / 原 arXiv 编号 | [论文](https://arxiv.org/abs/2603.19461) | Meta · UBC | [署名/机构来源](https://arxiv.org/pdf/2603.19461) | 标题/作者身份及所展示单位对应。 |
| SEES | `li2026sees` / 原 URL | [论文](https://arxiv.org/abs/2609.32698) | MBZUAI | [署名/机构来源](https://arxiv.org/pdf/2609.32698) | 标题/作者身份及所展示单位对应。 |
| ScholarEvolve | `yang2026scholarevolve` / 原 URL | [论文](https://arxiv.org/abs/2609.40169) | UC Santa Barbara | [署名/机构来源](https://arxiv.org/pdf/2609.40169) | 标题/作者身份及所展示单位对应。 |

## 复核文件

`representative-works-audit.json` 保存每条原始引用字段、稿件行号、当前卡片数据、证据 URL、版本差异和源文件 SHA-256。测试将卡片数据与已核对快照对照；以后修改链接/单位时需要同步复核，测试本身不代替文献事实核查。
