<template>
    <section>
        home
        <el-form>
            <h-form
                label="12"
                require
                prop="f"
            ></h-form>
        </el-form>
        <div class="content">
            <game-list height="130px"></game-list>
        </div>
    </section>
</template>

<script>
    import HForm from '@xiekai2018/h-form'
    import GameList from '@/components/gameList'
    export default {
        data() {
            return {}
        },
        components: {
            HForm,
            GameList
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="scss">
.content{
    width: 1200px;
    margin: 0 auto;
}
</style>
