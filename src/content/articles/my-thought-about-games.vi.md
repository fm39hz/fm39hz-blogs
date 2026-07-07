---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-05-26
title: Tản mạn về Game
location: Hà Nội
featured: false
draft: false
lang: vi
tags:
  - game-dev
  - rambling

description: Đôi lời lan man, từ góc nhìn phiến diện của cá nhân tôi.
---

Bài viết này không hướng dẫn cách làm game "tốt hơn", hay thế nào là 1 game "thành công", 1 "game hay",… mà nó chỉ có tác dụng kích thích tư duy, giúp người làm game hiểu sâu hơn về thứ mình đang tạo ra.

## Table of contents

## Ngộ nhận và liên tưởng

Đôi khi, trong quá trình tự phát triển game, tôi lại tự hỏi, rằng điều gì khiến game là game?

- **Đồ họa, Cốt truyện, world-building?** Hội họa, văn học, truyện tranh hay điện ảnh sẽ làm tốt hơn.
- **Nhịp điệu, Pacing, âm nhạc?** Một buổi biểu diễn âm nhạc có thể lo liệu tất cả.
- **Progression, sự tranh đấu, thắng thua?** Quá chung chung, bất kỳ trải nghiệm nào cũng có thể bao hàm nó.
- **Mechanic?** Cần phân biệt rõ với _luật_. Luật ở đây ám chỉ trạng thái logic thuần túy, không chứa chấp gì khác. Mechanic chỉ là 1 biểu hiện của luật, 1 luật có thể được biểu hiện dưới dạng nhiều mechanic khác nhau. Chẳng hạn như quân tốt đi 1 ô và quân pháo ăn qua đầu ngòi đều tuân thủ luật tốn 1 lượt.

Vậy, điều gì khiến game....là game?

## Nếu cái gì cũng không phải, thì cái khỉ gì khiến game là game?

Để trả lời câu hỏi này, chúng ta phải tìm ra được điều kiện cần cho định nghĩa về game.

Với tôi, game không phải "vòng tròn ma thuật", "cỗ máy kể chuyện", "lựa chọn thú vị",… hay bất kỳ một định nghĩa nào từng tồn tại trước đây. Game, dù là game điện tử hay các game thời kỳ tiền máy tính, đều cần hội đủ hai điều kiện: _Điều kiện cần_ & _Điều kiện đủ_.

### **Điều kiện cần**

- Theo tôi, game là:

  > _Một hệ đa tác nhân kiêm không gian khả năng dựa trên luật cung cấp cho các tác nhân khả năng làm thay đổi quỹ đạo vận hành bên trong không gian khả năng đó theo thời gian thực tại một thời điểm $\Delta t$ có thể truy vết._

- Trong đó:
- Tác nhân không chỉ là người chơi, mà còn có AI bot, DM, trọng tài, game manager,... Họ là những thực thể có **Tác quyền (Agency)** – năng lực đưa ra lựa chọn độc lập hoặc tiêm những hành động không thể đoán trước vào không gian khả năng. Một cái bẫy đung đưa theo bộ đếm giờ hay một NPC đi theo vòng lặp định sẵn không phải Tác nhân; chúng chỉ là Luật biểu hiện thành cỗ máy chuyển động. Một Tác nhân hành động _lên_ cỗ máy đó, đồng thời không tác nhân nào có quyền đứng trên luật.
- Luật, ở đây không chỉ là logic cơ học, mà còn là logic tâm lý học, toán học, động học,... mọi logic có thể tham số hoá thì đều là luật. Sự ngẫu nhiên, luật nội sinh, tác nhân chịu trách nhiệm ánh xạ luật,... nếu có, đều phải được tham số hóa thành luật.

- Từ đó, chúng ta có 2 **Định lý** được kéo theo:
- _Định lý 1_:

  > 1 game không có cái gọi là _cách chơi sai ý đồ_ mà vẫn đúng luật. Nếu một hành vi vẫn nằm trong không gian khả năng do luật _cho phép_, thì không thể gọi nó là _sai_.

- _Định lý 2_:
  > Game tự thân nó trung tính. Nó không có thuộc tính đạo đức, trải nghiệm hay ý nghĩa xã hội, vì thuộc tính là thứ không thay đổi dựa trên người đối diện.

### **Điều kiện đủ**

> Thực ra, điều này đã vượt quá phạm vi bài viết, vì chúng ta không cần nó để trả lời câu hỏi trên, nên tôi sẽ không đưa ra 1 suy đoán nào ở đây.

- Nếu buộc phải đưa ra một cái, thì tôi sẽ nói là "tất cả các luật đều phải có khả năng tham số hóa", nhưng đó chưa phải quyết định cuối cùng của tôi.
- Đây là thứ mà ngành game đang loay hoay. Họ tìm ra đủ thứ định nghĩa để cố bao hàm các 'tượng đài', trong khi thực tế một vài tượng đài còn chẳng có nổi điều kiện cần kia.
- Nhiều người nhầm lẫn danh từ _game_ với hành vi _chơi_, vốn là khi chúng ta cảm thấy được thổi hồn, cảm nhận được hành động của chính mình dưới vị thế một người quan sát có ý thức – thuộc về **lớp hiện tượng học**, và nó không thể làm điều kiện đủ cho **bản thể luận**. Có lẽ sẽ rất lâu nữa chúng ta mới tìm ra được một điều kiện đủ hoàn chỉnh, logic và không mâu thuẫn.

Đừng nhầm lẫn: Những "narrative-driven game" kia vẫn có thể là game nếu đáp ứng đủ điều kiện. Chỉ những thứ không khớp từ gốc rễ, ví dụ như mấy bộ phim tương tác lạm dụng minigame bắn súng, ném rìu, trèo qua mấy cái gờ màu vàng hay đi qua 1 cái bản đồ hình cái ống khổng lồ không có loading screen,... chỉ để thay thế nút "play/pause" của 1 bộ phim, như mấy game độc quyền của hãng S nào đó chẳng hạn, mới đáng bị nghi ngại, dẫu tôi không phủ nhận nó có minigame.
Nhưng, nếu 1 sản phẩm mà tới 80% các subsystem không đạt được điều kiện cần để coi là game lại được bán như game, thì nó là 1 case xấu trong _tư duy_.

Để dễ nắm bắt hơn, hãy thử 1 vài bài toán tư duy sau đây nhé.

## Các bài toán tư duy

- Hãy tư duy về **cờ vua**: Nếu con người tuyệt chủng, chỉ còn bộ luật sót lại, cờ vua có tồn tại không? Nếu người ngoài hành tinh tìm thấy 1 bộ cờ vua bằng gỗ và tạo ra 1 luật khác, thì đó có phải là cờ vua không? Nếu họ tìm được 1 bộ luật, rồi tự chế tác 1 bộ cờ bằng granite thì sao?
- Một **bản nhạc** của Beethoven vừa được phát hiện vào hôm qua, vậy trong hàng trăm năm nằm trong ngăn kéo, nó có phải là 'một bản nhạc' không? Beethoven bị điếc, vậy bản nhạc đó có phải bản nhạc không?
- 1 Chú cá bơi trong bể, được người chủ thiết lập các cảm biến để dịch vị trí của chú cá trong bể thành các input cho 1 bản game **Pokémon Fire Red**. Chẳng lẽ Pokémon không còn là game chỉ vì được phá đảo bởi một con cá hay sao?
- Quả bóng đã vào lưới, các cầu thủ không ai đứng sau hậu vệ, nhưng trọng tài biên khăng khăng vẫy cờ, từ chối bàn thắng và không chấp nhận dùng VAR, thì tại thời điểm đó nó có phải là trò chơi **bóng đá** ban đầu không? Nếu 1 quản trò trong 1 bàn chơi **DnD** ra quyết định rằng player A ở đầu bàn sẽ nhận được 2 lượt đi để bù đắp cho việc anh ta bị thụt lùi quá sâu so với cả bàn, thì nó có đúng là trò chơi ban đầu không? 1 nhóm 6 đứa trẻ chơi với nhau bằng **luật tự chế**, sau khi đứa trẻ A ghi điểm bằng 1 cách hợp lệ, nhưng khi đứa trẻ B đang thụt điểm rất sâu vừa dự định làm theo thì cả nhóm quyết định đổi luật để chống cách làm đó thì sao?

## Về người chơi

Theo Định lý 2, thì game tự thân nó trung tính. Lúc này, nghệ thuật vị nghệ thuật, bất kể ý đồ thiết kế ra sao, những ý nghĩa, trải nghiệm đó chỉ được phép thuộc về những người trải nghiệm nó, về tác nhân người chơi mà tôi đã đề cập.

Ví dụ, hãy tưởng tượng một nhà thiết kế game muốn không khuyến khích người chơi ăn thịt chó và thiết kế game xoay quanh điều đó, nhưng vẫn cho phép ăn thịt heo vì nó được coi là 'bình thường'. Nếu một người chơi đạo Hồi chơi game này, họ sẽ cảm thấy thế nào?

Và không, lần nữa, đừng nhầm lẫn, cái này phải nói cho rõ: Cốt truyện hay thông điệp không đá nhau với game, nó chỉ cần _phải là luật_.

> Hãy tôn trọng trí tuệ và tư cách người chơi, như cách tôi tôn trọng bạn, và bạn tôn trọng tôi, được chứ?

## Lời kết

Thực tế thì, chúng ta không cần định nghĩa chính xác tuyệt đối, chỉ cần tiến gần hơn tới sự thật mỗi ngày mà thôi.

Trước khi muốn làm game vui, game cảm động hay đột phá, hãy...làm game đã. Hãy làm tốt cái khiến sản phẩm của bạn phải là game trước. Từ _game_, ta mới có thể nâng cấp nó thành một _game hay_, chứ chuyển thể từ một bộ phim hay cuốn tiểu thuyết thành game là một quá trình không hề đơn giản, và bạn nên giữ nguyên nó.

Tôi không định nghĩa game, tôi chỉ đang khám phá bản chất của nó. Nếu bạn làm game để kể một câu chuyện sâu sắc, để làm giàu nhanh hay để khoe khoang, có lẽ bài viết này chưa phù hợp với những gì bạn tìm kiếm. Nhưng nếu bạn muốn hiểu về thứ mình đam mê, hy vọng đây là một góc nhìn đáng suy ngẫm.

