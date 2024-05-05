import React from 'react'
import NotificationItem from './NotificationItem'
import { useSelector } from 'react-redux'
import { notificationsConfig } from '../../../../app/config'
import { useState, useMemo, useRef } from 'react'
// import { Virtuoso } from 'react-virtuoso'
import InfiniteScroll from 'react-infinite-scroller';
function NotificationContainer() {
  const notifications = useSelector((state) => state.notification.notificationList)
  const sortNotification = (a, b) =>
    notificationsConfig[a.resourceId][a.notificationType].order > notificationsConfig[b.resourceId][b.notificationType].order ? 1 : -1

  // const sortedNotifications =
  // notifications.map((item, index) => ({ ...item, index })).sort(sortNotification)
  const sortedNotifications = useMemo(() => notifications.map((item, index) => ({ ...item, index })).sort(sortNotification), [notifications]);

  
  console.log('sortedNotifications', sortedNotifications)
  return (
    <div style={{ overflow: 'auto' }}>
      <InfiniteScroll
        pageStart={0}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {sortedNotifications.map((item, index) => (
          <NotificationItem key={index} {...item} />
        ))}
      </InfiniteScroll>

    </div>
  )
}

export default NotificationContainer


Поэтому я говорю
"In addition, I want to note that you described that magic, according to the worst forecasts, will last for a million years. And here the question arises if everyone uses magic excessively based on this, “they say there is a lot of magic, it will definitely be enough for a million.”
Will it then be enough for everyone for a million years? It seems to me that then it will be no different from us, who overused natural resources, based on the assumption that it was available elsewhere."
Я предлегаю использовать и магии и технологии и другии типы энергии. 
Пример: То есть использовать магии, наряду с энергией полученной от сольце. Или использовать магии с технолгией. Как с примере Лианы. Котоый испольвуют магию Аинза + промышленную революцию. Если она еще так будет продолжать, думаю оно еще много чего может изобрести


)) Мм, много где есть. Например:
Апофеоз демона – история эволюции монстра
Тут человечеству понадобилось несколько сотен лет, чтобы использовать ману который по идеи там бесконечно(основан на душ, как тут до изменения правила мира) Если бы это прочитали думаю немного, поняли бы что я имею в виду(где-то с середине начинается про ману). Там даже есть примеры использованы чрезмерного использованы маны как тут. Использовать его чтобы получить лучший урожай, и много ресурсов и т.д.

 I'm A Spider, So What?  
Тут даже меньше века понадобилась что грабить планету(как бы ману, точнее энергию планеты)

Насчет горы, как бы проблема не горе, а самом Людмиле, точнее ее использовании ресурсов. Как сказал сам Аинз, она не знает что такое слово, понятие  "умеренность". Как бы зачем крушить хорошую дом который уже есть(тут про опыт не учтем, только ресурсы). Если так хочется крушить можно использовать дерево или другие ресурсы. Если скажете что с дерево получиться плохой домик, я возворожу. Как по мне дерево лучше в основе дома чем камень, ее даже потом можно использовать)) 

((Тут лично мое замечание она(не только она, в этой истории многие) не знает что такое слово, понятие "оптимизации".
Например: Использование тонны камня для сверх защиты(я не против про использовании камня, а его чрезмерном использовании камня).. Который только с точки зрение безопасности особо не помогает. Остается много способов диверсии. 
Ой камонь есть много способов защиты: магические формации, куполы, заклиниение(через предметы), защитные механизмы и т.д. Уверен у Назарика есть много способов защиты. Я на 99% уверен, если они поделиться хотя бы частью этих знаний, то тут уже можно экономить  очень много камня и сделать безопасноть лучше. ))

"That's why I compared your original argument with "we should use oil because the sun will burn out if we use solar panels" we know the sun is finite, but we also know there is a fuck tone of it left. It makes way more sense to go solar and stretch the oil we've got left for as absolutely long as possible. Hopefully we ween ourselves off of it for good"
Тут думаю, мы немного друг-друга не правильно понимаем. Пожалуста почитайте и другие мои комментарии насчет этого, который писал в этой теме, вам и другим. 
Я не говорю что должны использовать что-то одно. Либо магии, либо ресурсы. Я говорю об использование обоих, с умом(то есть зная что они ограниченны) и эффективностью.
I'm talking about the abuse of magic))
Below I wrote comments about this, this applies to these comments)) I believe that technology (science) + magic is much more profitable than using only magic. For example: Liana, who makes an industrial revolution with the help of the undead, that is, technology + magic (obviously, she does not use natural resources for this, like us, but magic, in what sense). It can be assumed that this may be repeated in other industries (not undead, but a symbiosis of technology and magic). 

Ладно, вы сказали маны хватить на миллионы лет, если учесть только людей то 100тысяч. Давайте я тоже соглашусь с вами. 
Только предстаете:
Использование магии во всем делает их похожими на нас в плане использования электричества. Основное отличие этого мира в том, что он генерирует сам себя(то есть мир гененерует) , является беспроводным и универсальным. Если посмотреть на это с этой точки зрения, мана похожа на беспроводное электричество, которое хотел создать Тесла.)) и это срок(100тысяч лет/миллион) это учетом сегодняшнего их использовании магии. НО, их использовании магии будет увеличиваться каждые десятилетие в геометрическим прогрессе. То есть как у нас, увеличивался использовании электо энергии, при этом почти половина земного шара, не использует их в должней мере(заметно меньше чем современние государство).
И оно будет продолжаться увеличиваться, потому что Назарик рано или поздно всех захватить, и улучшить их жизни.
Только в отличие от нас они используют магии АБСОЛЮТНО везде.Может наступить время, когда они будут потреблять больше энергии, чем может генерировать мир. Пример: 
Через 3000-5000лет :
Потребление: 9,1 триллиона маны. 
Генерация: 9 триллионов маны. 
Через 7000-10000лет:
Потребление: 20 триллиона маны. 
Генерация: 10 триллионов маны. 
Если они будут использовать ману повсюду, рано или поздно это произойдет.



 