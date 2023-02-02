import { useEffect } from "react";

export default function Modal({ coords, set }: any){
	
	const appearCoords = getPosition(coords);

	function getPosition(coords: any){
		const el = document.documentElement;
		const coodX = el.clientWidth + el.scrollLeft;
		const coordY = el.clientHeight + el.scrollTop;
	
		let x = coords.x + 40;
		let y = coords.y - 90;
	
		if((x + 340) > coodX){
			x = coodX - 340;
		}
		
		if((y + 180) > coordY){
			y = coordY - 180; 
		}
	
		return {x, y}
	}

	useEffect(() => {
		document.body.classList.add('block');

	document.addEventListener('click', () => {
		set(null);
		document.body.classList.remove('block');
	}, {once: true})
	},[])

	return (
		<div
		  onClick={(e) => e.stopPropagation()}
            style={{
              height: 170,
			  width: 330,
              background: 'red',
              position: 'absolute',
			  zIndex: 110,
              top: coords.y,
              left: coords.x,
            }}
          >
            Попап
			<button onClick={() => {
				document.body.classList.remove('block');
				set(null)
				}}>Отменить</button>
			<button onClick={() => {
				document.body.classList.remove('block');
				remove(note)
				}}>Удалить</button>
          </div>
	)
}