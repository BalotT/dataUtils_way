export default {
    //深拷贝(没有function)
    deepCopy(data) {
        return window.JSON.parse(window.JSON.stringify(data));
    },
    //深拷贝(含有function)
    deepCopyFunction(obj, cache = []) {
        if (obj === null || typeof obj !== 'object') {
            return obj
        }
        const hit = cache.filter(c => c.original === obj)[0];
        if (hit) {
            return hit.copy
        }
        const copy = Array.isArray(obj) ? [] : {};
        cache.push({
            original: obj,
            copy
        });
        Object.keys(obj).forEach(key => {
            copy[key] = this.deepCopyFunction(obj[key], cache)
        });
        return copy
    },
    /**
     * 删除对象中某一项
     * @param data 键值对 对象
     * @param prop 需要对比匹配的值
     * @param key data中需要取值的key
     * @returns {boolean}
     */
    deleteItemInArr(data, prop, key = 'id') {
        for (let i = 0; i < data.length; i++) {
            if (data[i][key] === prop) {
                if (i === 0) {
                    data.shift();
                    return true;
                } else if (i === data.length - 1) {
                    data.pop();
                    return true;
                } else {
                    data.splice(i, 1);
                    return true;
                }
            }
        }
        return false;//返回值表示为false表示没有要删除的数据
    },
    /**
     * 判断数据类型
     * @param data
     * @returns {string}
     */
    dataType(data) {
        var toString = Object.prototype.toString;
        return data instanceof Element
            ? "element" // 为了统一DOM节点类型输出
            : toString
                .call(data)
                .replace(/\[object\s(.+)\]/, "$1")
                .toLowerCase();
    },
    /**
     * 计算时间差 参数格式 yyyy-MM-dd HH:mm:ss
     * @param start
     * @param end
     * @returns {string|number}
     */
    timeDifference(start = '', end) {
        if (!start || !end) {
            return ""
        }
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let difference = end - start;
        if (difference < 0) {
            return 0;
        }
        //计算出相差天数
        let days = Math.floor(difference / (24 * 3600 * 1000));
        //计算出小时数
        let leave1 = difference % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000);    //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        if (days === 0 && hours === 0) {
            return `${minutes}分钟`
        } else if (days === 0 && hours !== 0) {
            return `${hours}小时${minutes}分钟`;
        } else {
            return `${days}天${hours}小时${minutes}分钟`
        }
    },
    /**
     * 通过window.location.href导出下载等拼接url
     * @param param 键值对
     * @returns {string} xx&xx&xx
     */
    urlJoint(param) {
        let dataStr = "";
        for (let key in param) {
            if (typeof (param[key]) === 'undefined') {
                param[key] = "";
            }
            dataStr += key + '=' + param[key] + '&';
        }
        if (dataStr !== '') {
            return dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
        return ''
    },
    /**
     * js带有小数点的加法
     * @param data 数组  [1,2,3.22,4.12]
     * @returns {number}
     */
    floatAdd(data) {
        let count;
        let emptyArr = [];
        data.forEach((item, index) => {
            try {
                emptyArr[index] = item.toString().split(".")[1].length
            } catch (e) {
                emptyArr[index] = 0
            }
        });
        count = Math.pow(10, Math.max.apply(null, emptyArr));
        let total = data.reduce((pre, item) => {
            return pre + item * count
        }, 0);
        return total / count;
    },
    /**
     * 删除对象上无效的属性
     * @param obj
     * @returns {*}
     */
    clearObject(obj) {
        for (const key in obj) {
            if (typeof obj[key] != 'number' && !obj[key]) {
                delete obj[key]
            }
        }
        return obj
    },
    /**
     * 正则 金额 最多小数点两位
     * @param val
     * @returns {string}
     */
    isNumForMoney(val) {
        val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        val = val.replace(/^\./g, ""); //验证第一个字符是数字
        val = val.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
        return val;
    },
    /**
     * 获取制定日期 月份的第一天
     * @param time
     * @returns {Date}
     */
    getCurrentMonthFirst(time) {
        let date = new Date(time);
        date.setDate(1);
        return date;
    },
    /**
     * 获取制定日期 月份的最后一天
     * @param time
     * @returns {Date}
     */
    getCurrentMonthLast(time) {
        let date = new Date(time);
        let currentMonth = date.getMonth();
        let nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    },
    /**
     * 验证obj对象是否为空 {},null,''等都视为空
     * @param values
     * @returns {boolean}
     */
    objectIsEmpty(values) {
        return !(values && Object.keys(values).length);
    },
    /**
     * 数字前面补0
     * @param num 输入数字
     * @param n 需要补足多少位
     * @returns {string}
     */
    prefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }
}
