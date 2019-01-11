<template>
    <section class="chess-wrapper">
        <h2>五子棋</h2>
        <transition name="shade">
            <div class="shade" v-show="hide">
                <div class="title">{{title}}</div>
                <div class="restart-btn" @click.keyup.enter="restart">重新开始</div>
            </div>
        </transition>
        <table class="table">
            <tr v-for="(item,index) in tableData">
                <td v-for="(items,indexs) in item" :isSelect="items ? true:false"
                    :class="[items == 1 ? 'black' : items == 2? 'white':'']" :x=index :y=indexs></td>
            </tr>
        </table>
    </section>
</template>
<script type="text/ecmascript-6">
    export default({
        data() {
            return {
                isBlack: true,
                tableData: [],
                title: '',
                hide: false
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                for (let i = 0; i < 15; i++) {
                    this.tableData[i] = [];
                    for (let j = 0; j < 15; j++) {
                        this.tableData[i][j] = '';
                    }
                }
            },
            restart() {
                this.init();
                this.hide = false;
                this.$forceUpdate();
            },
            selectTd() {
                let table = document.getElementsByClassName('table')[0];
                table.addEventListener('click', this._handle, false);
            },
            _handle(event) {
                let target = event.target;
                let status = target.getAttribute('isSelect');
                if (status) {
                    return;
                }
                target.setAttribute('isSelect', true);
                let x = target.getAttribute('x');
                let y = target.getAttribute('y');
                let n = this.isBlack ? '1' : '2';  // 1 为黑棋  2 为白棋

                this.tableData[x][y] = n;
                this.$forceUpdate();

                let right = this.right(parseInt(x), parseInt(y), n);
                let down = this.down(parseInt(x), parseInt(y), n);
                let rightUp = this.rightUp(parseInt(x), parseInt(y), n);
                let rightDown = this.rightDown(parseInt(x), parseInt(y), n);
                if (right || down || rightUp || rightDown) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.hide = true;
                            this.title = !this.isBlack ? '黑棋获胜' : '白棋获胜';
                        }, 100);
                    });
                }
                this.isBlack = !this.isBlack;
            },
            rightUp(x, y, n) {
                for (let i = y + 1; i < y + 5; i++) {
                    x--;
                    if (x === 0 || y === 15 || n !== this.tableData[x][i]) {
                        return this.leftDown(x + 1, i - 1, n);
                    }
                }
                return true;
            },
            leftDown(x, y, n) {
                if (y - 4 < 0 || x + 4 > 14) return false;
                for (let i = y - 1; i > y - 5; i--) {
                    x++;
                    if (n !== this.tableData[x][i]) {
                        return false;
                    }
                }
                return true;
            },
            rightDown(x, y, n) {
                for (let i = y + 1; i < y + 5; i++) {
                    x++;
                    if (x === 15 || i === 15 || n !== this.tableData[x][i]) {
                        return this.leftUp(x - 1, i - 1, n);
                    }
                }
                return true;
            },
            leftUp(x, y, n) {
                if (y - 4 < 0 || x - 4 < 0) return false;
                for (let i = y - 1; i > y - 5; i--) {
                    x--;
                    if (n !== this.tableData[x][i]) {
                        return false;
                    }
                }
                return true;
            },
            right(x, y, n) {
                for (let i = y + 1; i < y + 5; i++) {
                    if (n !== this.tableData[x][i]) {
                        return this.left(x, i - 1, n);
                    }
                }
                return true;
            },
            left(x, y, n) {
                if (y - 4 < 0 || x - 4 < 0) return false;
                for (let i = y - 1; i > y - 5; i--) {
                    if (n !== this.tableData[x][i]) {
                        return false;
                    }
                }
                return true;
            },
            up(x, y, n) {
                if (x - 4 < 0) return false;
                for (let i = x - 1; i > x - 5; i--) {
                    if (n !== this.tableData[i][y]) {
                        return false;
                    }
                }
                return true;
            },
            down(x, y, n) {
                for (let i = x + 1; i < x + 5; i++) {
                    if (i === 15 || n !== this.tableData[i][y]) {
                        return this.up(i - 1, y, n);
                    }
                }
                return true;
            }
        },
        mounted() {
            this.selectTd();
        }
    });
</script>
<style lang="scss" scoped>
    html,body{
        width:100%;
        height:100%;
    }
    .shade {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9;
        .title {
            font-size: 30px;
            color: white;
            font-weight: 900;
            padding-top: 200px;
        }
        .restart-btn {
            padding: 4px 8px;
            border-radius: 2px;
            cursor: pointer;
            background: red;
            border: none;
            color: white;
            margin: 300px auto 0;
            display: inline-block;
        }
    }

    .chess-wrapper {
        width: 600px;
        height: 600px;
        margin: 0 auto;
        text-align: center;
        h2{
            text-align:center;
            font-size:30px;
            padding:15px;
        }
        table {
            background-image: url('../../assets/wuzi.jpg');
            background-size: contain;
            background-repeat: no-repeat;
            border-collapse: collapse;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 5px;
            display: block;
            tr {
                td {
                    width: 39px;
                    height: 39px;
                    /*border:1px solid #ccc;*/
                    position: relative;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;

                }
                td:after {
                    content: '';
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    /*background: red;*/
                    border-radius: 50%;
                    cursor: pointer;
                    left: 7px;
                    top: 7px;
                }
                td.black:before {
                    width: 39px;
                    height: 39px;
                    background: black;
                    border-radius: 50%;
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                td.white:before {
                    width: 39px;
                    height: 39px;
                    background: white;
                    border-radius: 50%;
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }

    }

    .shade-enter, .shade-leave-to {
        opacity: 0;
    }

    .shade-enter-active, .shade-leave-to {
        transition: all 0.2s linear;
    }

    .move-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .move-enter-active {
        transition: all 0.3s ease-in-out;
    }
</style>
