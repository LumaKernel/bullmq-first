*[CAUTION]: Not ready for production.*

`bullmq` で遊んでみた。


### 起動・モニタ

```
docker-compose up --build
```

Job は 1/5 の確率で失敗する。

### 水平スケーリング

```
docker-compose up -d --scale worker=1
docker-compose up -d --scale worker=2
docker-compose up -d --scale worker=3
```

1 だと足りない、2だと拮抗、3だと減っていく。という具合。

### UI

`http://127.0.0.1:17843/` から `redis` を登録して見る。

現時点で特に `bullmq` 向けのものはなさそう。
( cf. https://github.com/taskforcesh/bullmq/issues/63 )

## メモ

- TypeScript で書かれている、すばら
- LIFO と FIFO のみサポートしている。 priority 積極的に使いたい場合は注意が必要。
- もうほぼ bull v3 と同等の機能をもっている
  - https://github.com/taskforcesh/bullmq/issues/274
- 複数同時に突っ込む場合は `addBulk` を使う
- `scheduler` は多分、 `celery` でいうところの `beat` かな。
  - 失敗した Job をもっかい待機列に並び直したりしているらしい
- `concurrency` 増やすのと `worker` インスタンス増やすのは…多分一緒かなあ
  - この2つなら `concurrency` を増やすべきかな
  - レートリミットは worker に対してだから、これと組み合わせると意味を持ちそうかな
  - 5, 10, 15 と増えて、30 まで増える、みたいな。
- 実際には `Queue` への依存みたいなのはなくて、Redis だけで会話、TS レベルで見るならキュー名だけで会話している。
- `Queue("queue-name")` とかしたくなる動機としては、そのキューにたいして Job の情報がほしいとか、もちろん Job を追加したいときとか、都度インスタンスつくって調べて、おわったら GC させて、って感じなんだろう。
- なので、以下みたいな方法で切り分ければいいんじゃないかな。この repo なら 1. かな。
  1. キュー名を定数として分ける
  2. キュー名から各インスタンスを作る関数群を作る
- cron したいなら専用のがある。
  - https://docs.bullmq.io/guide/jobs/repeatable
  - 古いゴミは自分で消さなきゃダメそう ?
- `watcher.ts` は DB に progress 永続化させるとか、失敗通知するとか、そいういう用途かなー
- ドキュメントまだ弱いかな。


## 参考

- https://github.com/taskforcesh/bullmq
- https://github.com/taskforcesh/bullmq/issues
- https://docs.bullmq.io/
