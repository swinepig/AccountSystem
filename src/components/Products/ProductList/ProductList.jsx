import React, {Component, PropTypes} from 'react';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import dateFormat from '../../../utils/dateFormat';
import {PAGE_SIZE} from '../../../constants/constants';
import Spliter from '../../Spliter/Spliter';
import {productList} from './index.css';

const ProductList = ({
    total,
    current,
    loading,
    dataSource,
    onPageChange,
    onModify,
    onDel,
	onDetail
}) => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index)=><span>{index + 1}</span>
        },
		{
			title: '商品图片',
			dataIndex: 'productImg',
			key: 'productImg',
			render: (text, record, index)=>{
				if(text){
					return <img style={{width:100}} src={text[0].response} alt="商品图片"/>
				}else {
					return null;
				}
			}
		},
        {
            title: '商品编号',
            dataIndex: 'productNumber',
            key: 'productNumber'
        },
        {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: '商品类别',
            dataIndex: 'productType',
            key: 'productType'
        },
        {
            title: '单位',
            dataIndex: 'productUnit',
            key: 'productUnit',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record)=>(
                <p>
                    <a onClick={()=> onModify(record)}>编辑</a>
                    <Spliter spliterText="|"/>
                    <Popconfirm title="确定删除该条记录？" onConfirm={()=> onDel(record['_id'])}>
                        <a type='ghost'>删除</a>
                    </Popconfirm>
					<Spliter spliterText="|"/>
					<a onClick={()=> onDetail(record)}>详情</a>
                </p>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };

    return (
        <div className={productList}>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record=>record._id}
                pagination={false}
                rowSelection={rowSelection}
            />
            <Pagination
                className="ant-table-pagination"
                total={total}
                current={parseInt(current)}
                pageSize={PAGE_SIZE}
                onChange={onPageChange}
            />
        </div>
    );
};

ProductList.propTypes = {
    onPageChange: PropTypes.func,
    onModify: PropTypes.func,
    onDel: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    total: PropTypes.any,
    current: PropTypes.any
};

export default ProductList;