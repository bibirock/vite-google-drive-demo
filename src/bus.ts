import mitt from 'mitt';

type bus = {
    $on?: unknown;
    $off?: unknown;
    $emit?: unknown;
};

const bus: bus = {};

const emtter = mitt();

bus.$on = emtter.on;
bus.$off = emtter.off;
bus.$emit = emtter.emit;

export default bus;
