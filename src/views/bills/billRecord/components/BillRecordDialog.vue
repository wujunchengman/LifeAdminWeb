<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}账单记录`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="dialogProps.row">
      <el-form-item label="内容" prop="content">
        <el-input v-model="dialogProps.row!.content" placeholder="明细" clearable></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input-number v-model="dialogProps.row!.amount" />
      </el-form-item>
      <el-form-item label="时间" prop="dateTime">
        <el-date-picker
          aria-label="时间"
          prop="dateTime"
          v-model="dialogProps.row!.dateTime"
          type="datetime"
          placeholder="请选择时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="BillRecordDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
  id: [{ required: true, message: "型号ID不能为空且必须全局唯一" }],
  description: [{ required: true, message: "型号通用描述" }],
  deviceHostType: [{ required: true, message: "请选择设备连接类型" }]
});

interface DialogProps {
  title: string;
  row: Partial<any>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
  dialogProps.value = params;
  dialogVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await dialogProps.value.api!(dialogProps.value.row);
      ElMessage.success({ message: `${dialogProps.value.title}账单记录成功！` });
      dialogProps.value.getTableList!();
      dialogVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
