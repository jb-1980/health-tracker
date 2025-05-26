export const AspectRatioBox = (props: {
  children: React.ReactNode
  ratio: number
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: `${(1 / props.ratio) * 100}%`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
