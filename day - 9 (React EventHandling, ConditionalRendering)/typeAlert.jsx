function TypeAlert(){
    const shoot = (a,b) =>{alert(b.type)};
    return(
        <div>
            <button onClick={(event) => shoot('Goal!', event)}>
  Take a shot
</button>
        </div>
    )
}
export default TypeAlert;
