/* eslint-disable */
import React,{ Fragment } from 'react';
import { Modal ,Button ,Select} from 'antd';
import Prompt from './Prompt'

const Option = Select.Option;
const confirm = Modal.confirm;
export const defaultEsearchConfig = {
		header:"高德测试",
    //顶部菜单渲染数组
    headMenu:[],
    //子节点类型 为空或treeNode 
    renderChildType:"",
		method:{
       // [ 可选 ] 菜单图标点击钩子 返回false 屏蔽切换展示功能
			 menuClickHook(){
          return true
       },
       // [ 可选 ] 查询图标点击钩子 返回false 屏蔽查询功能
       searchClickHook(){
          return true
       },
       showList(this:any,RowData){
          this.setState((prevState,props)=>{
             return{
               handle:"show",
               visible:true,
               params:RowData,
               placement:"right"
             }
           })
       },
       editList(this:any,RowData){
           this.setState((prevState,props)=>{
               return{
                 handle:"edit",
                 visible:true,
                 params:RowData,
                 placement:"bottom"
               }
           })
       },
       deleteList(this:any,RowData){
            this.props.modal.confirm({
              title: '确定删除当前数据？',
              okText: '确认',
              okType: 'danger',
              cancelText: '取消',
              onOk:()=>{
                const Actios = this.props.ownAction;
                if(Actios.length>0){
                  Actios.forEach((actions,index)=>{
                    if(actions.actionType.endsWith("DATALIST_DELETE")){
                      console.log(actions.actionType)
                    }
                  })
                }
                this.props.Prompt["success"]("删除成功！")
              }
            })
       }
		},
    //子节点获取会数据的函数 对应 renderChildType 字段 
    callback:{
      
    },
    searchPanel:{
      type:"table",//表单展示类型  table|card
      search:[
        // {  // 筛选项  
        //   field:'groupName',
        //   type:"Input",
        //   label:"分组查询",
        //   placeholder:'请输入分组名称',
        //   //antd ->Form.Item 配置
        //   antdFormItemOptions:{ 
        //     colon:false
        // },
        // //antd ->getFieldDecorator(id, options)    antdOptions对应 options 配置
        //   antdOptions:{
        //    rules: [{
        //       required: true,
        //       message: 'Please input your name',
        //     }]
        //   }
        // },
        // {
        //   field:'caseNo1',
        //   type:"Input",
        //   label:"案件编号",
        //   placeholder:'请输入案件编号',
        //   antdFormItemOptions:{
        //     colon:false
        //   },
        // }
      ],
      //对应antd 中的 form的配置项   [ 可选 ]
      formOptions:{ 
        hideRequiredMark:true
      },
      //对应antd 中的 栅格配置   [ 可选 ]
      searchLayout:{
       xl:6,lg:12,md:12,sm:24,xs:24
      },
      //筛选表单项 label 和表单的布局 label wrapper   [ 可选 ]
      layout:{ 
        //对应antd 中的配置
        labelCol: {
          xs: {span: 10},
          sm: {span: 6},
          md: {span: 8},
          lg: {span: 6},
          xl: {span: 8},
          xxl: {span: 5}
        },
        //对应antd 中的配置
        wrapperCol: {
          xs: {span: 14},
          sm: {span: 18},
          md: {span: 14},
          lg: {span: 18},
          xl: {span: 16},
          xxl: {span: 19}
        },
      },
      operation:{   //[ 必填  ]  
        layout:"left" ,//提交按钮组 布局
        buttonGroup:[{type:"submit",text:"查询"},{type:"reset",text:"重置"}]  //提交按钮项
      }
    },
    listConfig:{
      // 对应antd的Table配置
      tableConfig:{
        rowKey:"groupId"
      },
      // 表格列map数据，对应antd的表格 columns
      tableColumns:[
        // {
        // title: '部门名称',
        // align:"center",
        // dataIndex: 'deptName',
        // render: text => <a href="javascript:;">{text}</a>,
        // }, {
        //   title: '分组名称',
        //   align:"center",
        //   dataIndex: 'groupName',
        // },{
        //   title: '创建时间',
        //   align:"center",
        //   dataIndex: 'createTime',
        // }, {
        //   title: '更新时间',
        //   align:"center",
        //   dataIndex: 'updateTime',
        // },{
        //   title: '操作',
        //   align:"center",
        //   render: function(this:any,text, record, index){
        //     return(
        //       <Fragment>
        //         <Button  
        //           style={{marginRight:"10px"}} 
        //           type="primary" 
        //           size="small" 
        //           onClick={this.props.method.showList.bind(this,record)}
        //         >详情</Button>
        //         <Button 
        //           style={{marginRight:"10px"}}  
        //           size="small"
        //           onClick={this.props.method.editList.bind(this,record)}
        //           >修改</Button>
        //         <Button  
        //           style={{marginRight:"10px"}} 
        //           type="danger" 
        //           size="small"
        //            onClick={this.props.method.deleteList.bind(this,record)}
        //           >删除</Button>
        //       </Fragment>
        //     )
        //   },
        // },
        ],
      //对应antd的 pagination 配置
      pagination:{
        showSizeChanger:true,
        showQuickJumper:true,
        pageSize:10,
        currPage:1
      },
      cardHandleBtn:[
        // {
        //   type:"primary",
        //   text:"详情"
        // },{
        //   type:"",
        //   text:"修改"
        // },{
        //   type:"danger",
        //   text:"删除",
        // }
      ]
    },
    detailCofig:{
      drawerConfig:{
        placement:"right",
      },
      content:function(){ 

      }
    },
    editConfig:{
      content:function(){
        
      }
    },
    modal:{
      confirm:function(params){
        confirm(params);
      }
    },
    Prompt:Prompt.component,
    ApiConfig:{
      /**
        * [listEffectParams description]  [ 可选 ]
        * @-param [globalState]:获取注入的全局redux的state;
        * @-param [currentState]:当前renderprops模式中传递的state [包括菜单的状态 |分页的信息 ]  
        * @-return 返回值作为 列表查询时额外附加的参数
      */
       listEffectParams(globalState,currentState){
         // console.log(globalState,currentState);
         return { page:currentState.pagination.currPage,pageSize:currentState.pagination.pageSize,deptId:1018}
       }
    }
}

export const emptyFormConfig = function(this:any){
  const that = this;
  return{
        Rowlayout:{type:"flex",justify:"start"},
        searchPanel:{
          search:[{
              field:'dutyType',
              type:"Custom",//自定义类型  
              label:"班次类型",
              renderCustom:function(){//自定义渲染函数
                  return(
                    <Select defaultValue={that.params?that.params.dutyType:""}>
                      <Option value={1}>内勤班次</Option>
                      <Option value={2}>外勤班次</Option>
                    </Select>
                  )
              },
              antdFormItemOptions:{
                colon:false
              },
          },{  // 筛选项  
              field:'name',
              label:"班次名称",
              type:"Input",
              inputConfig:{// antd input 配置
                placeholder:"测试holder"
              },
              placeholder:'请输入分组名称',
              //antd ->Form.Item 配置
              antdFormItemOptions:{ 
                colon:false
              },
              //antd ->getFieldDecorator(id, options)    antdOptions对应 options 配置
              antdOptions:{
               initialValue:that.params?that.params.name:"",
               rules: [{
                  required: true,
                  message: '请输入班次名称',
                }]
              }
            },{  // 筛选项  
              field:'groupName1',
              label:"分组查询",
              type:"Input",
              inputConfig:{// antd input 配置
                placeholder:"测试holder"
              },
              placeholder:'请输入分组名称',
              //antd ->Form.Item 配置
              antdFormItemOptions:{ 
                colon:false
              },
              //antd ->getFieldDecorator(id, options)    antdOptions对应 options 配置
              antdOptions:{
               initialValue:"Please input your namePlease input your namePlease input your name",
               rules: [{
                  required: true,
                  message: 'Please input your name',
                }]
              }
            }],
        //对应antd 中的 form的配置项   [ 可选 ]
        formOptions:{ 
          // hideRequiredMark:true,
          // style:{
          //   width:"1400px",
          //   background:"#fff",
          //   paddingTop:"30px",
          //   height:"100%",
          //   paddingRight:"40px",
          //   borderRight:"1px solid #d8ecfc",
          //   borderLeft:"1px solid #d8ecfc"
          // }
        },
        //对应antd 中的 栅格配置   [ 可选 ]
        searchLayout:{
          xl:8,lg:12,md:24,sm:24,xs:24
        },
        //筛选表单项 label 和表单的布局 label wrapper   [ 可选 ]
        layout:{ 
          //对应antd 中的配置
         labelCol: {
            xs: {span: 10},
            sm: {span: 12},
            md: {span: 10},
            lg: {span: 6},
            xl: {span: 6},
            xxl: {span: 6}
          },
          wrapperCol: {
            xs: {span: 14},
            sm: {span: 12},
            md: {span: 10},
            lg: {span: 16},
            xl: {span: 16},
            xxl: {span: 18}
          },
        },
        operation:{   //[ 必填  ]  
          layout:"center" ,//提交按钮组 布局
          buttonGroup:[{type:"submit",text:"查询"},{type:"reset",text:"重置"}]  //提交按钮项
        }
      }
  }
}