function Child(props) {
  return <props.children name="react" />
}

function Test() {
  return (
    <Child>
      {(props) => {
        return <h2>{props.name}</h2>
      }}
    </Child>
  )
}

export default Test
