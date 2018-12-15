import React from "react";
import {BENEFICIARY, RELATION_ENUM} from "@/common/const";
import {
  Agreement,
  CellBody,
  CellHeader,
  Form,
  FormCell,
  Input,
  Label,
  Preview,
  PreviewButton,
  PreviewFooter,
  Select,
  Toast,
  Toptips
} from "react-weui";
import Placeholder from "@/components/Placeholder";
import "./style.less";
import request from "@/common/request";
import {getBirthdayByIdNo, isMobile, isValidDate} from "@/common/utils";
import ProductFooter from "@/components/ProductFooter";
import {idCardNoUtil} from "@/common/isCardNoUtil";

class Insure extends React.Component {
  constructor(props, context) {
    super(props, context)
    let policyDetail = this.props.location.state.policy;
    let premium = this.props.location.state.premium;
    let industry = this.props.location.state.industry;
    console.log(policyDetail);
    console.log(premium);
    console.log(industry);
    let productType;
    if (policyDetail.id === 'a792595c-6d15-49a4-8665-f5248f1a6497') {
      productType = 1;//有职业，保障对象只能是本人
    } else if (policyDetail.id === 'c9f63b90-718c-444a-a7bf-a6c3fd867823') {
      productType = 2;//没有职业，保障对象可以是本人、子女
    }
    this.state = {
      error: null,
      showLoading: false,
      showNotice: false,
      //投保人
      policyHolderName: '',//投保人姓名
      policyHolderGender: '',//投保人性别
      policyHolderCredentialType: '',//投保人证件类型
      policyHolderCredential: '',//投保人证件号码
      policyHolderBirthday: '',//投保人出生日期
      policyHolderPhoneNumber: '',//投保人手机号码
      policyHolderEmail: '',//投保人电子邮箱
      industry: industry,//行业对象
      policyHolderOccupation: industry.occupationName,//投保人职业
      policyStartDate: '', //起保日期
      insureObject: '', //保障对象
      relationship: '',//投保人和被投保人之间的关系
      //被投保人
      theInsuredName: '',//被投保人姓名
      theInsuredGender: '',//被投保人性别
      theInsuredCredentialType: '',//被投保人证件类型
      theInsuredCredential: '',//被投保人证件号码
      theInsuredBirthday: '',//被投保人出生日期
      theInsuredPhoneNumber: '',//被投保人手机号码
      beneficiaryType: '', //受益人类型
      checked: 0,//是否勾选我已阅读并同意 1 勾选 0 未勾选
      hideTheBlockOfTheInsured: true, //隐藏被保险人信息填写块
      productType: productType, // 产品分类暂时就两个 不是1(有职业，保障对象只能是本人)  就是2
      calResult: '',//立即投保返回结果
      premium: premium,//保费
      policyDetail: policyDetail,//保单详情
      policyItem: {
        "beneficiaries": [],
        "consultant": {
          "id": "",
          "innerId": "",
          "innerName": "",
          "innerPhone": "",
          "outerId": "",
          "outerName": "",
          "outerPhone": "",
          "tenantName": ""
        },
        "insured": {
          "id": "",
          "insuredIdentityCard": "",
          "insuredIdentityType": "",
          "insuredName": "",
          "insuredOccupationName": "",
          "insuredPhone": "",
          "ownerRelation": "",
          "policyId": ""
        },
        "owner": {
          "clientOwnerId": "",
          "financialPlannerId": "",
          "id": "",
          "ownerAddress": "",
          "ownerEmail": "",
          "ownerHoldingName": "",
          "ownerIdentityCard": "",
          "ownerIdentityType": "",
          "ownerName": "",
          "ownerOccupationName": "",
          "ownerPayBankerCard": "",
          "ownerPayBankerName": "",
          "ownerPhone": "",
          "policyId": ""
        },
        "policy": {
          "beneficiaryType": "",
          "createTime": "",
          "durationType": "DURATION_TYPE_ONCE",
          "extraInfo": "",
          "financialPlannerCode": "",
          "flag": true,
          "id": "",
          "insuranceCompanyName": "",
          "insuredDuration": "",
          "ownerId": "",
          "payAmount": 0,
          "payDuration": "",
          "payTime": "",
          "payingDuration": "",
          "policyCode": "",
          "productId": "",
          "productName": "",
          "state": "POLICY_INIT",
          "tenantId": "",
          "thirdId": "",
          "thirdName": "",
          "tradeCode": "",
          "underwriteTime": "",
          "underwritingTime": ""
        },
      }
    }
  }

  //投保人姓名
  policyHolderNameChange(e) {
    this.setState({
      policyHolderName: e.target.value
    })
  }

  // 投保人性别
  policyHolderGenderChange(e) {
    this.setState({
      policyHolderGender: e.target.value
    })
  }

  //投保人证件类型
  policyHolderCredentialTypeChange(e) {
    this.setState({
      policyHolderCredentialType: e.target.value
    })
  }

  //投保人证件号码
  policyHolderCredentialChange(e) {
    if (this.notEmpty(this.state.policyHolderCredentialType)) {//已选择证件类型
      if (this.state.policyHolderCredentialType === "身份证") {
        if (this.state.productType === 1) {
          this.setState({
            policyHolderCredential: e.target.value,
          })
        } else if (this.state.productType === 2) {
          this.setState({
            policyHolderCredential: e.target.value,
          });
          let birthday = getBirthdayByIdNo(e.target.value);
          console.log("birthday = " + birthday);
          if (isValidDate(birthday)) {//必须校验日期格式是否合法，不然ios的input会出问题
            this.setState({
              policyHolderBirthday: birthday,
            })
          }
        }
      } else {
        this.setState({
          policyHolderCredential: e.target.value,
        })
      }
    } else {
      this.setState({
        policyHolderCredential: e.target.value,
      })
    }
  }

  //出生日期
  policyHolderBirthdayChange(e) {
    this.setState({
      policyHolderBirthday: e.target.value,
    })
  }

  //起保日期
  policyStartDateChange(e) {
    this.setState({
      policyStartDate: e.target.value,
    })
  }

  //检查投保日期
  checkPolicyStart() {
    let pass = true;
    let currentTimeStamp = Date.parse(new Date());//当前时期的时间戳
    let stringTime = this.state.policyStartDate;
    let selectedTimestamp = Date.parse(new Date(stringTime));//选中日期的时间戳
    if (selectedTimestamp - currentTimeStamp < 0) {
      this.showError('起保时间不能早于当前时间');
      pass = false;
      return pass;
    }
    if ((selectedTimestamp - currentTimeStamp) / 1000 / 60 / 60 / 24 > 30) {
      this.showError('起保时间必须在30天内');
      pass = false;
      return pass;
    }
    return pass;
  }

  //投保人手机号码
  policyHolderPhoneNumberChange(e) {
    this.setState({
      policyHolderPhoneNumber: e.target.value
    })
  }

  //投保人电子邮箱
  policyHolderEmailChange(e) {
    this.setState({
      policyHolderEmail: e.target.value
    })
  }

  //投保人职业
  policyHolderOccupationChange(e) {
    this.setState({
      policyHolderOccupation: e.target.value
    })
  }

  //保障对象
  insureObjectChange(e) {
    this.setState({
      theInsuredName: '',
      theInsuredGender: '',
      theInsuredCredentialType: '',
      theInsuredCredential: '',
      theInsuredBirthday: '',
      theInsuredPhoneNumber: '',
    });
    let hide = true;
    let relationship;
    if (e.target.value === "本人") {
      hide = true;
      relationship = RELATION_ENUM.RELATION_SELF;
      //被保障对象是本人的话 被保险人信息可以不填
    } else if (e.target.value === "子女") {
      hide = false;
      relationship = RELATION_ENUM.RELATION_CHILDREN;
    } else if (e.target.value === "请选择保障对象") {
      hide = true;
    }
    this.setState({
      insureObject: e.target.value,
      relationship: relationship,
      hideTheBlockOfTheInsured: hide,
    })
  }

  //被投保人姓名
  theInsuredNameChange(e) {
    this.setState({
      theInsuredName: e.target.value
    })
  }

  //被投保人性别
  theInsuredGenderChange(e) {
    this.setState({
      theInsuredGender: e.target.value
    })
  }

  //被投保人证件类型
  theInsuredCredentialTypeChange(e) {
    this.setState({
      theInsuredCredentialType: e.target.value
    })
  }

  //被投保人证件号码
  theInsuredCredentialChange(e) {
    if (this.notEmpty(this.state.theInsuredCredentialType)) {//已选择证件类型
      if (this.state.theInsuredCredentialType === "身份证") {
        if (this.state.productType === 1) {
          this.setState({
            theInsuredCredential: e.target.value,
          })
        } else if (this.state.productType === 2) {
          let birthday = getBirthdayByIdNo(e.target.value);
          console.log(birthday);
          this.setState({
            theInsuredCredential: e.target.value,
            theInsuredBirthday: birthday,
          })
        }
      } else {
        this.setState({
          theInsuredCredential: e.target.value,
        })
      }
    } else {
      this.setState({
        theInsuredCredential: e.target.value,
      })
    }
  }

  theInsuredBirthdayChange(e) {
    this.setState({
      theInsuredBirthday: e.target.value,
    })
  }

  //检查出生日期
  checkBirthday(e) {
    let currentTimeStamp = Date.parse(new Date());//当前时期的时间戳
    let stringTime = e;
    let selectedTimestamp = Date.parse(new Date(stringTime));//选中日期的时间戳
    if (selectedTimestamp - currentTimeStamp > 0) {
      this.showError('出生日期不能大于当前日期');
      return false;
    }
    return true;
  }

  //被投保人手机号码
  theInsuredPhoneNumberChange(e) {
    this.setState({
      theInsuredPhoneNumber: e.target.value
    })
  }

  //受益人类型
  beneficiaryTypeChange(e) {
    let beneficiaryType;
    if (e.target.value === "请选择受益人类型") {
      beneficiaryType = "";
    } else if (e.target.value === "法定受益人") {
      beneficiaryType = BENEFICIARY.BENEFICIARY_TYPE_STATUTORY;
    }
    this.setState({
      beneficiaryType: beneficiaryType
    })
  }

  //显示顶部错误信息
  showError(msg, time = 2000) {
    setTimeout(() => {
      this.setState({error: null})
    }, 2000)
    this.setState({error: msg})
  }

  //判空
  notEmpty(v) {
    return v && v !== ''
  }

  //agreement
  checkboxChange(e) {
    this.setState({
      checked: this.state.checked === 1 ? 0 : 1,
    });
  }

  //立即投保
  insureImmediately() {
    if (!this.notEmpty(this.state.policyHolderName)) {
      return this.showError('请输入投保人姓名')
    }
    if (!this.notEmpty(this.state.policyHolderGender)) {
      return this.showError('请选择投保人性别')
    }
    if (!this.notEmpty(this.state.policyHolderCredentialType)) {
      return this.showError('请选择投保人证件类型')
    }
    if (!this.notEmpty(this.state.policyHolderCredential)) {
      return this.showError('请输入投保人证件号码')
    }
    if (this.state.productType === 1) {
      if (!idCardNoUtil.checkIdCardNo(this.state.policyHolderCredential)
        && this.state.policyHolderCredentialType === "身份证") {
        return this.showError('请输入正确的证件号码')
      }
    } else if (this.state.productType === 2) {
      if (!idCardNoUtil.checkIdCardNo(this.state.policyHolderCredential)
        && this.state.policyHolderCredentialType === "身份证") {
        return this.showError('请输入正确的证件号码')
      }
      if (!this.notEmpty(this.state.policyHolderBirthday)) {
        return this.showError('请填写出生日期')
      }
      if (!this.checkBirthday(this.state.policyHolderBirthday)) {
        return;
      }
    }
    if (!this.notEmpty(this.state.policyHolderPhoneNumber)) {
      return this.showError('请输入投保人手机号码')
    }
    if (!isMobile(this.state.policyHolderPhoneNumber)) {
      return this.showError('手机号码格式不正确')
    }
    if (!this.notEmpty(this.state.policyHolderEmail)) {
      return this.showError('请输入投保人电子邮箱')
    }
    if (this.state.productType === 1 && !this.notEmpty(this.state.policyHolderOccupation)) {
      return this.showError('请输入投保人职业')
    }
    if (!this.notEmpty(this.state.policyStartDate)) {
      return this.showError('请选择起保日期')
    }
    if (!this.checkPolicyStart()) {
      return;
    }
    //投保人部分校验完毕
    //被保险人部分校验开始
    if (!this.notEmpty(this.state.insureObject) || this.state.insureObject === "请选择保障对象") {
      return this.showError("请选择保障对象")
    }
    if (this.state.insureObject === '本人') {
    } else if (this.state.insureObject === '子女') {
      if (!this.notEmpty(this.state.theInsuredName)) {
        return this.showError("请填写被保险人姓名");
      }
      if (!this.notEmpty(this.state.theInsuredGender)) {
        return this.showError("请填写被保险人性别");
      }
      if (!this.notEmpty(this.state.theInsuredCredentialType)) {
        return this.showError("请填写被保险人证件类型");
      }
      if (!this.notEmpty(this.state.theInsuredCredential)) {
        return this.showError("请填写被保险人证件号码");
      }
      if (this.state.productType === 1) {
        if (!idCardNoUtil.checkIdCardNo(this.state.theInsuredCredential)
          && this.state.theInsuredCredentialType === "身份证") {
          return this.showError('请输入正确的被保险人证件号码')
        }
      } else if (this.state.productType === 2) {
        if (!idCardNoUtil.checkIdCardNo(this.state.theInsuredCredential)
          && this.state.theInsuredCredentialType === "身份证") {
          return this.showError('请输入正确的被保险人证件号码')
        }
        if (!this.notEmpty(this.state.theInsuredBirthday)) {
          return this.showError('请填写被保险人出生日期')
        }
        if (!this.checkBirthday(this.state.theInsuredBirthday)) {
          return;
        }
      }
      if (!this.notEmpty(this.state.theInsuredPhoneNumber)) {
        return this.showError("请填写被保险人手机号码")
      }
      if (!isMobile(this.state.theInsuredPhoneNumber)) {
        return this.showError('被保险人手机号码格式不正确')
      }
    }
    if (!this.notEmpty(this.state.beneficiaryType)) {
      return this.showError("请选择受益人类型");
    }
    if (this.state.checked === 0) {
      return this.showError("请选择同意条款");
    }
    this.setState({showLoading: true});
    this.requestCal(this.buildPolicyData(this.state.policyItem));
  }

  //构建整体表单信息
  buildPolicyData(data) {
    //构建理财顾问信息
    data.consultant = {
      "id": null,
      "innerId": "innerId-0001",
      "innerName": "内部顾问1",
      "innerPhone": "12345678901",
      "outerId": "outerId-0001",
      "outerName": "外部顾问1",
      "outerPhone": "12345678901",
      "tenantName": "鼎盛"
    };
    //构建投保人信息
    data.owner = {
      "clientOwnerId": "client-owner-id",//客户ID
      "financialPlannerId": "",//理财师ID
      "id": null,
      "ownerAddress": null,
      "ownerEmail": this.state.policyHolderEmail,
      "ownerHoldingName": this.state.policyHolderName,
      "ownerIdentityCard": this.state.policyHolderCredential,
      "ownerIdentityType": this.state.policyHolderCredentialType,
      "ownerName": this.state.policyHolderName,
      "ownerOccupationName": this.state.policyHolderOccupation,
      "ownerOccupationCode": this.state.industry.code,//投保人职业编码
      "ownerPayBankerCard": null,
      "ownerPayBankerName": null,
      "ownerPhone": this.policyHolderPhoneNumber,
      "policyId": null,
    };
    //构建被保险人信息
    data.insured = {
      "id": null,
      "insuredIdentityCard": this.state.theInsuredCredential,
      "insuredIdentityType": this.state.theInsuredCredentialType,
      "insuredName": this.state.theInsuredName,
      "insuredOccupationName": null,
      "insuredOccupationCode": this.state.industry.code,//被保险人职业编码
      "insuredPhone": this.state.theInsuredPhoneNumber,
      "ownerRelation": this.state.relationship,
      "policyId": null,
    };
    //构建表单信息
    data.policy = {
      "beneficiaryType": this.state.beneficiaryType,
      "createTime": null,
      "durationType": "DURATION_TYPE_ONCE",//TODO 之后根据产品投保期限 做对应的处理
      "extraInfo": this.state.policyDetail.extraInfo,
      "financialPlannerCode": null,//理财师code
      "flag": this.state.policyDetail.flag,
      "id": null,//后端建的
      "insuranceCompanyName": this.state.policyDetail.insuranceCompanyName,
      "insuredDuration": this.state.policyDetail.insuredDuration,
      "ownerId": null,//后端建的
      "payAmount": this.state.premium,//保费
      "payDuration": "1",
      "payTime": this.state.policyDetail.payTime,
      "payingDuration": this.state.policyDetail.payingDuration,
      "policyCode": this.state.policyDetail.policyCode,
      "productId": this.state.policyDetail.id,
      "productName": this.state.policyDetail.productName,
      "state": this.state.policyDetail.state,
      "tenantId": this.state.policyDetail.tenantId,
      "thirdId": this.state.policyDetail.thirdId,
      "thirdName": this.state.policyDetail.thirdName,
      "tradeCode": this.state.policyDetail.tradeCode,
      "underwriteTime": this.state.policyDetail.underwriteTime,
      "underwritingTime": this.state.policyDetail.underwritingTime,
    };
    return data;
  }

  requestCal(data) {
    console.log("policyData :" + JSON.stringify(data));
    let api = '/api/v1/client/insurance/policy/save';
    request.post(api, data)
      .then(res => {
        console.log(res);
        this.setState({showLoading: false})
        if (res.data.statusCode === 0) {
          this.props.history.push(`/policy/pay`, {policyId: res.data.data})
        }
      })
      .catch(err => {
        this.setState({showLoading: false})
        console.log(err);
      })
  }

  render() {
    return (
      <div className="page-product-plan">
        <Toptips type="warn" show={this.state.error !== null}>{this.state.error}</Toptips>
        <div className="form-li-title" style={{marginTop: '0.75rem'}}>投保人</div>
        <Form className="mt0">

          <FormCell>
            <CellHeader>
              <Label>姓名</Label>
            </CellHeader>
            <CellBody>
              <Input type="text" placeholder="请填写姓名"
                     value={this.state.policyHolderName}
                     onChange={this.policyHolderNameChange.bind(this)}/>
            </CellBody>
          </FormCell>

          <FormCell select selectPos="after">
            <CellHeader>
              <Label>性别</Label>
            </CellHeader>
            <CellBody>
              <Select defaultValue={this.state.policyHolderGender}
                      onChange={this.policyHolderGenderChange.bind(this)}>
                <option value="">请选择性别</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </Select>
            </CellBody>
          </FormCell>

          <FormCell select selectPos="after">
            <CellHeader>
              <Label>证件类型</Label>
            </CellHeader>
            <CellBody>
              {
                this.state.productType === 1 ?
                  (<Select defaultValue={this.state.policyHolderCredentialTypeChange}
                           onChange={this.policyHolderCredentialTypeChange.bind(this)}>
                    <option value="">请选择证件类型</option>
                    <option value="身份证">身份证</option>
                  </Select>) : ( <Select defaultValue={this.state.policyHolderCredentialTypeChange}
                                         onChange={this.policyHolderCredentialTypeChange.bind(this)}>
                  <option value="">请选择证件类型</option>
                  <option value="身份证">身份证</option>
                  <option value="护照">护照</option>
                  <option value="港澳居民通行证(回乡证)">港澳居民通行证(回乡证)</option>
                  <option value="台湾居民通行证(台胞证)">台湾居名通行证(台胞证)</option>
                </Select>)
              }
            </CellBody>
          </FormCell>

          <FormCell>
            <CellHeader>
              <Label>证件号码</Label>
            </CellHeader>
            <CellBody>
              <Input type="text" placeholder="请填写证件号码"
                     value={this.state.policyHolderCredential}
                     onChange={this.policyHolderCredentialChange.bind(this)}/>
            </CellBody>
          </FormCell>

          {
            this.state.productType === 1 ? ('')
              : (<FormCell>
              <CellHeader>
                <Label>出生日期</Label>
              </CellHeader>
              <CellBody>
                <Input type="date" placeholder="请选择出生日期"
                       value={this.state.policyHolderBirthday}
                       onChange={this.policyHolderBirthdayChange.bind(this)}/>
              </CellBody>
            </FormCell>)
          }

          <FormCell>
            <CellHeader>
              <Label>手机号码</Label>
            </CellHeader>
            <CellBody>
              <Input type="number" placeholder="请填写手机号码"
                     value={this.state.policyHolderPhoneNumber}
                     onChange={this.policyHolderPhoneNumberChange.bind(this)}/>
            </CellBody>
          </FormCell>

          <FormCell>
            <CellHeader>
              <Label>电子邮箱</Label>
            </CellHeader>
            <CellBody>
              <Input type="email" placeholder="请填写电子邮箱（收取电子保单）"
                     value={this.state.policyHolderEmail}
                     onChange={this.policyHolderEmailChange.bind(this)}/>
            </CellBody>
          </FormCell>

          {
            this.state.productType === 1 ? (<FormCell>
              <CellHeader>
                <Label>职业</Label>
              </CellHeader>
              <CellBody>
                <Input type="text" placeholder="请填写职业"
                       value={this.state.policyHolderOccupation}
                       onChange={this.policyHolderOccupationChange.bind(this)}
                       readOnly="readonly"
                />
              </CellBody>
            </FormCell>)
              : ('')
          }


          <FormCell>
            <CellHeader>
              <Label>起保日期</Label>
            </CellHeader>
            <CellBody>
              <Input type="date" placeholder="请选择投保日期"
                     value={this.state.policyStartDate}
                     onChange={this.policyStartDateChange.bind(this)}/>
            </CellBody>
          </FormCell>

        </Form>

        <div className="form-li-title" style={{marginTop: '0.75rem'}}>被保险人</div>
        <Form className="mt0">

          <FormCell select selectPos="after" className={this.state.hideTheBlockOfTheInsured ? '' : 'extra_line'}>
            <CellHeader>
              <Label>保障对象</Label>
            </CellHeader>
            <CellBody>
              {
                this.state.productType === 1 ?
                  (<Select defaultValue={this.state.insureObject}
                           onChange={this.insureObjectChange.bind(this)}>
                    <option value="请选择保障对象">请选择保障对象</option>
                    <option value="本人">本人</option>
                  </Select>) : ( <Select defaultValue={this.state.insureObject}
                                         onChange={this.insureObjectChange.bind(this)}>
                  <option value="请选择保障对象">请选择保障对象</option>
                  <option value="本人">本人</option>
                  <option value="子女">子女</option>
                </Select>)
              }
            </CellBody>
          </FormCell>

          <div className={this.state.hideTheBlockOfTheInsured ? 'hide' : ''}>
            <FormCell>
              <CellHeader>
                <Label>姓名</Label>
              </CellHeader>
              <CellBody>
                <Input type="text" placeholder="请填写姓名"
                       value={this.state.theInsuredName}
                       onChange={this.theInsuredNameChange.bind(this)}/>
              </CellBody>
            </FormCell>

            <FormCell select selectPos="after">
              <CellHeader>
                <Label>性别</Label>
              </CellHeader>
              <CellBody>
                <Select defaultValue={this.state.theInsuredGender} onChange={this.theInsuredGenderChange.bind(this)}>
                  <option value="">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </Select>
              </CellBody>
            </FormCell>

            <FormCell select selectPos="after">
              <CellHeader>
                <Label>证件类型</Label>
              </CellHeader>
              <CellBody>
                {
                  this.state.productType === 1 ?
                    (<Select defaultValue={this.state.theInsuredCredentialType}
                             onChange={this.theInsuredCredentialTypeChange.bind(this)}>
                      <option value="">请选择证件类型</option>
                      <option value="身份证">身份证</option>
                    </Select>) : ( <Select defaultValue={this.state.theInsuredCredentialType}
                                           onChange={this.theInsuredCredentialTypeChange.bind(this)}>
                    <option value="">请选择证件类型</option>
                    <option value="身份证">身份证</option>
                    <option value="护照">护照</option>
                    <option value="港澳居民通行证(回乡证)">港澳居民通行证(回乡证)</option>
                    <option value="台湾居民通行证(台胞证)">台湾居名通行证(台胞证)</option>
                  </Select>)
                }
              </CellBody>
            </FormCell>

            <FormCell>
              <CellHeader>
                <Label>证件号码</Label>
              </CellHeader>
              <CellBody>
                <Input type="text" placeholder="请填写证件号码"
                       value={this.state.theInsuredCredential}
                       onChange={this.theInsuredCredentialChange.bind(this)}/>
              </CellBody>
            </FormCell>

            {
              this.state.productType === 1 ? ('')
                : (<FormCell>
                <CellHeader>
                  <Label>出生日期</Label>
                </CellHeader>
                <CellBody>
                  <Input type="date" placeholder="请选择出生日期"
                         value={this.state.theInsuredBirthday}
                         onChange={this.theInsuredBirthdayChange.bind(this)}/>
                </CellBody>
              </FormCell>)
            }

            <FormCell>
              <CellHeader>
                <Label>手机号码</Label>
              </CellHeader>
              <CellBody>
                <Input type="number" placeholder="请填写手机号码"
                       value={this.state.theInsuredPhoneNumber}
                       onChange={this.theInsuredPhoneNumberChange.bind(this)}/>
              </CellBody>
            </FormCell>
          </div>

        </Form>

        <Form className="mt0" style={{marginTop: '0.75rem'}}>
          <FormCell select selectPos="after">
            <CellHeader>
              <Label>受益人</Label>
            </CellHeader>
            <CellBody>
              <Select onChange={this.beneficiaryTypeChange.bind(this)}>
                <option value="请选择受益人类型">请选择受益人类型</option>
                <option value="法定受益人">法定受益人</option>
              </Select>
            </CellBody>
          </FormCell>
        </Form>

        <Agreement checked={this.state.checked === 1 ? true : false}
                   onChange={this.checkboxChange.bind(this)}>
          &nbsp;&nbsp;我已阅读并同意
        </Agreement>

        <div className="agreement-container"><span>《产品条款》</span>、<span>《投保声明》</span></div>

        <ProductFooter thirdId={this.state.policyDetail.thirdId}/>
        <Placeholder height="50"/>

        <Preview style={{zIndex: 9999,}}>
          <PreviewFooter className="fixed-bottom full-width">
            <PreviewButton className="bg-white align-left pl15 color-orange">
              {this.state.premium !== '' ? `${this.state.premium}元` : ''}
            </PreviewButton>
            <PreviewButton primary className="btn btn-primary"
                           onClick={this.insureImmediately.bind(this)}>立即投保</PreviewButton>
          </PreviewFooter>
        </Preview>

        <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
      </div>
    )
  }
}


export default Insure
