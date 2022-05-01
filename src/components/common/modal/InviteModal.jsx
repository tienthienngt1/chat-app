import {
  useState,
  useCallback
} from "react";
import {
  useSelector,
  useDispatch
} from "react-redux";
import {
  Modal,
  Empty,
  Avatar,
  notification,
  Select,
  Spin
} from "antd";
import {
  setIsOpenInviteFalse
} from "../../../redux/slice/modalSlice";
import {
  getUser
} from "../../../api/get";
import {
  updateMember
} from "../../../api/update";
import debounce from "lodash/debounce";
import styled from "styled-components"

const ModalWrap= styled(Modal)`
  .ant-modal{
    &-content, &-header, label, h2{
      ${props => props.theme.theme ? props.theme.light : props.theme.dark}
    }
  }
  label, h2{
      ${props => props.theme.theme ? props.theme.light : props.theme.dark}
    }
`

const InviteModal = () => {
  //defination
  const [state,
    setState] = useState({
      loading: false,
      data: [],
      value: ''
    })
  const [userValue,
    setUserValue] = useState('')
  const dispatch = useDispatch();
  const {
    modalReducer,
    roomReducer,
    themeReducer
  } = useSelector((state) => state)

  // handle search
  const debounceFunc = useCallback(debounce(async value => {
    const result = await getUser(value)
    if (result.status) {
      let resultArr = []
      result.result.forEach(res => {
        resultArr.push({
          label: <> < Avatar src = {
            res.photoURL
          } style = {{
              marginRight: "10px"
            }} >
          {
            res?.displayName?.charAt(0)?.toUpperCase()} < /Avatar>
          {
            res.displayName
          } < />,
          value: res.uid,
        })
      })
      setState({
        ...state,
        loading: false,
        data: resultArr,
      })
    }
  },
    1500), [])

  const handleSearch = value => {
    setState({
      ...state,
      value
    })
    if (!value) return;
    if (!state.loading) setState({
      data: [], loading: true
    })
    debounceFunc(value.trim())
  }

  const handleBlur = () => {
    setState({
      loading: false,
      data: [],
      value: ''
    })
  }

  // handle cancel and ok
  const onCancel = () => {
    dispatch(setIsOpenInviteFalse());
  };
  
  const onOk = async () => {
    if (!userValue) return
    const result = await updateMember(userValue, roomReducer.currentRoom)
      notification[result.status === 1 ? "success" : "error"]({
        message: result.status === 1 ? "SUCCESS!" : "ERROR!",
        description:  result.status ===1 ? "Invited successfully!" : result.status ===2 ? "Member was in room" : "Error"
      })
    dispatch(setIsOpenInviteFalse());
  };
  return ( <ModalWrap
    theme={themeReducer}
    visible = {
      modalReducer.isOpenInvite
    }
    onCancel = {
      onCancel
    }
    title = { < center > < h2 > Invite Friend < /h2> < /center>
    }
    onOk = {
      onOk
    } > < Select
    mode = "multiple"
    onBlur = {
      handleBlur
    }
    allowClear
    style = {{
      width: '100%'
    }}
    placeholder = "Enter your friend name..."
    onChange = {
      value => setUserValue(value)}
    onSearch = {
      handleSearch
    }
    searchValue = {
      state.value
    }
    notFoundContent = {
      state.loading ? < center><Spin size = "large" /></center> : <Empty/ >
    }
    options = {
      state.data
    }
    /> < /ModalWrap>
  );
};

export default InviteModal;