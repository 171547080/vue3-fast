<template>
    <div class="toolbar">
        <div class="toolbar-left">
            <slot name="left"></slot>
        </div>

        <slot name="default"></slot>

        <div class="toolbar-right">
            <slot name="right"></slot>
            <div class="search-warp">
                <slot name="search"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.toolbar {
    padding: 10px 0;

    .item-label {
        padding: 0 10px;
    }

    .item-input {
        margin-left: 15px;
    }

    .toolbar-left {
        display: inline-block;
    }

    .toolbar-right {
        bottom: 0;
        float: right;
    }

    .search-warp {
        padding-right: 15px;
        float: right;
    }

    &:after {
        content: "";
        display: block;
        clear: both;
    }

}
</style>
