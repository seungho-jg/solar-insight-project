<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { goto } from '$app/navigation';
  function handleClick() {
    goto('/estimate')
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
<div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
  <div class="container mx-auto px-4 py-8 md:py-16">
    <!-- 헤더 섹션 -->
    <div class="text-center mb-12 space-y-4">
      <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
        태양광 발전 수익 계산기
      </h1>
      <p class="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
        태양광 발전으로 얻을 수 있는 예상 수익을 간단하게 계산해보세요
      </p>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- 설명 카드 -->
      <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-6 text-slate-800">태양광 발전 수익 산출 방법</h2>
        <p class="text-slate-600 leading-relaxed">
          태양광발전사업 전 예상 수익을 산출은 사업을 시작할지 결정하는 데 중요한 정보가 됩니다. 
          태양광 발전 수익은 SMP와 REC 두 가지 수익이 발생합니다.
        </p>
      </div>

      <!-- 정보 그리드 -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-semibold mb-4 text-slate-800">연간 예상 생산 용량</h3>
          <p class="text-slate-600">
            태양광 발전 사업의 수익을 산출하기 위해서 전력생산량 예측은 매우 중요한 지표입니다.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-semibold mb-4 text-slate-800">SMP 수익</h3>
          <p class="text-slate-600">
            SMP수익은 한전에서 전기를 매전 해주는 단가로 매달 발전량에 따라 계산됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA 버튼 -->
    <div class="fixed bottom-8 left-0 right-0 flex justify-center z-20">
      <Button
        onclick={handleClick}
        class="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg font-medium"
      >
        예상수익 알아보기
      </Button>
    </div>
  </div>

  <!-- 장식용 배경 요소 -->
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <div class="absolute -top-1/2 -right-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
    <div class="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
  </div>
</div>