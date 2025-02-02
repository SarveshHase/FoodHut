import { useUserContext } from '../../../context/UserContext'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function AdminRoute({ children }) {
  const { user } = useUserContext()
  if (user != null) {
    return (user?.user?.role === "admin") ? (children) : <Navigate to="/error" />
  }

  return (<Navigate to="/login" />)
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default AdminRoute